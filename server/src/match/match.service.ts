import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnalysisService } from 'src/analysis/analysis.service';
import { decodeMatchShareCode } from 'csgo-sharecode';
import * as fs from 'fs';
import * as path from 'path';
import bz2 from 'unbzip2-stream';
import * as https from 'https';
import { SteamService } from 'src/steam/steam.service';


function calculateKDR(kills: number, deaths: number): number {
  return deaths === 0 ? kills : parseFloat((kills / deaths).toFixed(2));
}

@Injectable()
export class MatchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly analysisService: AnalysisService,
    private readonly steamService: SteamService,
  ) {}

  async getAllMatches() {
    return this.prisma.match.findMany({
      orderBy: { playedAt: 'desc' },
      include: { stats: true },
    });
  }

  async getMatchesForPlayer(steamId: string) {
    return this.prisma.match.findMany({
      where: {
        stats: {
          some: { steamId },
        },
      },
      orderBy: { playedAt: 'desc' },
      include: { stats: true, steamMatch: true, uploadedMatch: true },
    });
  }

  async getMatchById(id: string) {
    const match = await this.prisma.match.findUnique({
      where: { id },
      include: { stats: true },
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    return match;
  }

  async downloadDemo(url: string, outPath: string): Promise<void> {
    const agent = new https.Agent({ minVersion: 'TLSv1.3' });
    const response = await axios.get(url, {
      responseType: 'stream',
      httpsAgent: agent,
    });

    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    const writeStream = fs.createWriteStream(outPath);
    const bunzip = bz2();

    return new Promise((resolve, reject) => {
      response.data.pipe(bunzip).pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  }

  async syncMatchesForUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.gameAuthCode || !user?.lastMatchCode) {
      throw new BadRequestException('Game Authentication Code or Last Match Code is missing. Please add them in your settings to enable match syncing.');
    }

    const player = await this.prisma.player.findFirst({
      where: { user: { id: userId } },
    });

    if (!player) throw new Error('No player linked to user');

    const steamId = player.steamId;
    let currentCode = user.lastMatchCode;
    const syncedMatches: string[] = [];

    while (true) {
      try {
        const res = await axios.get(
          'https://api.steampowered.com/ICSGOPlayers_730/GetNextMatchSharingCode/v1',
          {
            params: {
              key: process.env.STEAM_API_KEY,
              steamid: steamId,
              steamidkey: user.gameAuthCode,
              knowncode: currentCode,
            },
          }
        );

        const nextCode = res.data?.result?.nextcode;
        if (!nextCode || nextCode === 'n/a') break;

        try {
          const matchInfo = await this.steamService.getMatchInfoFromShareCode(nextCode);
          const rounds = matchInfo?.roundstatsall;
          const mapUrl = rounds?.length ? rounds[rounds.length - 1]?.map : null;
          const matchid = matchInfo?.matchid;

          if (!mapUrl || !matchid) {
            console.warn('⚠️ No map URL or match ID found in match info.');
            break;
          }

          const fileName = `${matchid}.dem`;
          const outPath = path.resolve(`./downloads/${fileName}`);

          console.log('📥 Downloading from:', mapUrl);
          await this.downloadDemo(mapUrl, outPath);

          await this.analysisService.analyzeAndSaveFromSteam(outPath, {
            mapUrl,
            reservationId: matchInfo?.reservationid?.toString() ?? undefined,
          });

          syncedMatches.push(matchid.toString());
          currentCode = nextCode;
        } catch (err) {
          console.error('Error syncing match from code', nextCode, err);
          currentCode = nextCode;
          continue;
        }
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          if (status === 403) throw new Error('Invalid or expired Steam auth code.');
          if ([429, 503, 504].includes(status || 0)) {
            console.warn('Temporary Steam API error. Try again later.');
            break;
          }
        }

        console.error('Error fetching next match code:', err);
        break;
      }
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { lastMatchCode: currentCode },
    });

    return { success: true, syncedMatches };
  }
  

  async findUserProgress(steamId: string, limit: number): Promise<any[]> {
    const userMatchStats = await this.prisma.playerMatchStats.findMany({
      where: {
        steamId: steamId,
      },
      orderBy: {
        match: {
          playedAt: 'desc',
        },
      },
      take: limit,
      select: {
        accuracySpotted: true,
        timeToDamage: true,
        crosshairPlacement: true,
        sprayAccuracy: true,
        counterStrafeRatio: true,
        headshotAccuracy: true,
        headshotPercentage: true,
  
        totalKills: true,
        totalDeaths: true,
        totalAssists: true,
        totalDamage: true,
  
        openingKills: true,
        openingAttempts: true,
  
        tradeKills: true,
        tradeAttempts: true,
  
        tradedDeaths: true,
        tradedDeathAttempts: true,
  
        twoKillRounds: true,
        threeKillRounds: true,
        fourKillRounds: true,
        fiveKillRounds: true,
  
        match: {
          select: {
            matchId: true,
            mapName: true,
            playedAt: true,
          },
        },
      },
    });
  
    const progressEntries = userMatchStats.map(stat => {
      const kdr = calculateKDR(stat.totalKills, stat.totalDeaths);
  
      return {
        matchId: stat.match.matchId,
        mapName: stat.match.mapName,
        playedAt: stat.match.playedAt.toISOString(),
        userStats: {
          accuracySpotted: stat.accuracySpotted,
          timeToDamage: stat.timeToDamage,
          crosshairPlacement: stat.crosshairPlacement,
          sprayAccuracy: stat.sprayAccuracy,
          counterStrafeRatio: stat.counterStrafeRatio,
          headshotAccuracy: stat.headshotAccuracy,
          headshotPercentage: stat.headshotPercentage,
  
          totalKills: stat.totalKills,
          totalDeaths: stat.totalDeaths,
          totalAssists: stat.totalAssists,
          totalDamage: stat.totalDamage,
  
          openingKills: stat.openingKills,
          openingAttempts: stat.openingAttempts,
  
          tradeKills: stat.tradeKills,
          tradeAttempts: stat.tradeAttempts,
  
          tradedDeaths: stat.tradedDeaths,
          tradedDeathAttempts: stat.tradedDeathAttempts,
  
          twoKillRounds: stat.twoKillRounds,
          threeKillRounds: stat.threeKillRounds,
          fourKillRounds: stat.fourKillRounds,
          fiveKillRounds: stat.fiveKillRounds,
  
          kdr: kdr,
        },
      };
    });
  
    return progressEntries.reverse(); // so oldest comes first
  }
  
}

