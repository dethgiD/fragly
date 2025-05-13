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
import { computeScores, PerformanceBucket, PillarScores, PlayerScoreDto } from 'src/analysis/review/review';
import { PlayerScore } from 'generated/prisma/client';

export interface ProgressEntry {
  matchId:     string;
  mapName:     string;
  playedAt:    string;
  team1Score:  number;
  team2Score:  number;
  userStats:   Record<string, number>;
  score:       {
    matchScore:  number;
    bucket:      string;
    pillars: {
      firepower:    number;
      accuracy:     number;
      entryTrading: number;
      clutch:       number;
    };
    diffs: Record<string, number>;
  };
}


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
  

  async findUserProgress(
    steamId: string,
    limit: number
  ): Promise<ProgressEntry[]> {
    // 1) Lookup the Player record so we can filter playerScore by playerId
    const player = await this.prisma.player.findUnique({
      where: { steamId },
    });
    if (!player) {
      throw new NotFoundException(`No player found with steamId ${steamId}`);
    }

    // 2) Fetch the recent PlayerMatchStats (with the internal match ID)
    const stats = await this.prisma.playerMatchStats.findMany({
      where: { steamId },
      orderBy: { match: { playedAt: 'desc' } },
      take:    limit,
      select:  {
        matchId:            true,                       // internal PK
        steamId:            true,                       // user steamId
        totalKills:         true,
        totalDeaths:        true,
        totalAssists:       true,
        totalDamage:        true,
        headshotPercentage: true,
        accuracySpotted:    true,
        timeToDamage:       true,
        crosshairPlacement: true,
        sprayAccuracy:      true,
        counterStrafeRatio: true,
        headshotAccuracy:   true,
        openingKills:       true,
        openingAttempts:    true,
        tradeKills:         true,
        tradeAttempts:      true,
        tradedDeaths:       true,
        tradedDeathAttempts:true,
        twoKillRounds:      true,
        threeKillRounds:    true,
        fourKillRounds:     true,
        fiveKillRounds:     true,
        match: {
          select: {
            matchId:    true,  // the external matchId
            mapName:    true,
            playedAt:   true,
            team1Score: true,
            team2Score: true,
          }
        }
      }
    });

    if (stats.length === 0) {
      return [];
    }

    const matchInternalIds = stats.map(s => s.matchId);

    // 3) Fetch the precomputed scores in one go
    const preScores = await this.prisma.playerScore.findMany({
      where: {
        playerId: player.id,
        matchId: { in: matchInternalIds },
      }
    });

    // 4) Build a lookup by internal matchId
    const scoreMap: Record<string, PlayerScore> = {};
    for (const s of preScores) {
      scoreMap[s.matchId] = s;
    }

    // 5) Merge raw stats + score into ProgressEntry
    const entries: ProgressEntry[] = stats.map(s => {
      const raw = s;
      const score = scoreMap[raw.matchId];
      if (!score) {
        // In case you have a match without a saved score (unlikely)
        throw new NotFoundException(`No precomputed score for match ${raw.matchId}`);
      }

      // Compute any derived raw stats
      const kdr = calculateKDR(raw.totalKills, raw.totalDeaths);

      return {
        matchId:    raw.match.matchId,
        mapName:    raw.match.mapName,
        playedAt:   raw.match.playedAt.toISOString(),
        team1Score: raw.match.team1Score,
        team2Score: raw.match.team2Score,

        userStats: {
          totalKills:         raw.totalKills,
          totalDeaths:        raw.totalDeaths,
          totalAssists:       raw.totalAssists,
          totalDamage:        raw.totalDamage,
          headshotPercentage: raw.headshotPercentage,
          kdr,

          accuracySpotted:    raw.accuracySpotted,
          timeToDamage:       raw.timeToDamage,
          crosshairPlacement: raw.crosshairPlacement,
          sprayAccuracy:      raw.sprayAccuracy,
          counterStrafeRatio: raw.counterStrafeRatio,
          headshotAccuracy:   raw.headshotAccuracy,

          openingKills:       raw.openingKills,
          openingAttempts:    raw.openingAttempts,
          tradeKills:         raw.tradeKills,
          tradeAttempts:      raw.tradeAttempts,
          tradedDeaths:       raw.tradedDeaths,
          tradedDeathAttempts:raw.tradedDeathAttempts,

          twoKillRounds:      raw.twoKillRounds,
          threeKillRounds:    raw.threeKillRounds,
          fourKillRounds:     raw.fourKillRounds,
          fiveKillRounds:     raw.fiveKillRounds,
        },

        score: {
          matchScore:  score.matchScore,
          bucket:      score.bucket,
          pillars: {
            firepower:    score.firepower,
            accuracy:     score.accuracy,
            entryTrading: score.entryTrading,
            clutch:       score.clutch,
          },
          diffs: score.diffs as Record<string, number>,
        }
      };
    });

    // 6) Return oldest‑first so your charts flow L→R in chronological order
    return entries.reverse();
  }

  async getMatchScores(matchId: string): Promise<PlayerScoreDto[]> {
    // pull from the playerScore table
    const rows = await this.prisma.playerScore.findMany({
      where: { matchId },
      orderBy: { matchScore: 'desc' },
      include: {
        player: {
          select: { steamId: true, user: { select: { displayName: true } } }
        }
      }
    });

    if (rows.length === 0) {
      return [];  // controller will turn this into a 404
    }

    // map to your PlayerScoreDto
    return rows.map(r => {
      const username = r.player.user?.displayName ?? r.player.steamId;
      const pillars: PillarScores = {
        firepower:    r.firepower,
        accuracy:     r.accuracy,
        entryTrading: r.entryTrading,
        clutch:       r.clutch,
      };

      return {
        steamId:    r.player.steamId,
        username,
        matchScore: r.matchScore,
        bucket:     r.bucket as PerformanceBucket,
        pillars,
        diffs:      r.diffs as Record<string, number>,
      };
    });
  }
  
}

