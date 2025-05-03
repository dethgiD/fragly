import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class AnalysisService {
  constructor(private readonly prisma: PrismaService) {}

  private computeFileHash(filePath: string): string {
    const buffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    return hash;
  }

  async analyzeDemo(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const exe = process.platform === 'win32'
        ? './analysis_exe/DemoAnalysis.exe'
        : './analysis_exe/DemoAnalysis';
  
      const child = spawn(exe, [filePath]);
  
      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });
  
      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
  
      child.on('close', (code) => {
        if (code !== 0) {
          return reject(new Error(`Analyzer exited with code ${code}`));
        }
  
        try {
          const result = JSON.parse(output);
          fs.unlinkSync(filePath);
          resolve(result);
        } catch (err) {
          console.error('Failed to parse analyzer output:', err);
          reject(err);
        }
      });
    });
  }

  async saveAnalysis(
    result: any,
    source: 'uploaded' | 'steam',
    steamDetails?: Partial<{ mapUrl: string; reservationId: string; playedAt: Date }>
  ) {
    if (!result || !result.matchId || !Array.isArray(result.players) || !result.mapName) {
      throw new Error('Invalid analysis result structure');
    }
  
    const existing = await this.prisma.match.findUnique({
      where: { matchId: result.matchId },
      include: { stats: true },
    });
  
    if (existing) return existing;
  
    const playedAt = source === 'steam'
      ? steamDetails?.playedAt ?? new Date()
      : new Date();
  
    const match = await this.prisma.match.create({
      data: {
        matchId: result.matchId,
        team1Score: result.team1Score,
        team2Score: result.team2Score,
        mapName: result.mapName,
        playedAt,
        stats: {
          create: result.players.map((player: any) => ({
            steamId: player.steamId,
            username: player.username,
            rank: player.rank,
            teamNumber: player.teamNumber,
            totalKills: player.totalKills,
            totalDeaths: player.totalDeaths,
            totalAssists: player.totalAssists,
            totalDamage: player.totalDamage,
            headshotPercentage: player.headshotPercentage,
            accuracySpotted: player.accuracySpotted,
            timeToDamage: player.timeToDamage,
            crosshairPlacement: player.crosshairPlacement,
            sprayAccuracy: player.sprayAccuracy,
            counterStrafeRatio: player.counterStrafeRatio,
            headshotAccuracy: player.headshotAccuracy,
            openingKills: player.openingKills,
            openingAttempts: player.openingAttempts,
            tradeKills: player.tradeKills,
            tradeAttempts: player.tradeAttempts,
            tradedDeaths: player.tradedDeaths,
            tradedDeathAttempts: player.tradedDeathAttempts,
            twoKillRounds: player.twoKillRounds,
            threeKillRounds: player.threeKillRounds,
            fourKillRounds: player.fourKillRounds,
            fiveKillRounds: player.fiveKillRounds,
            player: {
              connectOrCreate: {
                where: { steamId: player.steamId },
                create: { steamId: player.steamId },
              },
            },
          })),
        },
      },
      include: { stats: true },
    });
  
    if (source === 'uploaded') {
      await this.prisma.uploadedMatch.create({
        data: { id: match.id },
      });
    } else if (source === 'steam' && steamDetails) {
      await this.prisma.steamMatch.create({
        data: {
          id: match.id,
          mapUrl: steamDetails.mapUrl || '',
          reservationId: steamDetails.reservationId || null,
        },
      });
    }
  
    return match;
  }
  
  

  async analyzeAndSaveFromUpload(file: Express.Multer.File): Promise<any> {
    const filePath = path.resolve(file.path);
    const matchId = this.computeFileHash(filePath);

    const existing = await this.prisma.match.findUnique({
      where: { matchId },
      include: { stats: true }
    });

    if (existing) {
      fs.unlinkSync(filePath);
      return existing;
    }

    const analysis = await this.analyzeDemo(filePath);
    analysis.matchId = matchId; // override with file hash
    return await this.saveAnalysis(analysis, 'uploaded');
  }

  async analyzeAndSaveFromSteam(filePath: string, steamMeta: { mapUrl: string, reservationId?: string }): Promise<any> {
    const analysis = await this.analyzeDemo(filePath);
    return await this.saveAnalysis(analysis, 'steam', steamMeta);
  }
}
