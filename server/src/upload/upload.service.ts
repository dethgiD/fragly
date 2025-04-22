import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  private computeFileHash(filePath: string): string {
    const buffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    return hash;
  }

  async handleFile(file: Express.Multer.File): Promise<any> {
    const filePath = path.resolve(file.path);
    const matchId = this.computeFileHash(filePath);

    try {
      const existing = await this.prisma.match.findUnique({
        where: { matchId },
        include: { stats: true },
      });
  
      if (existing) {
        console.log(`Match ${matchId} already analyzed.`);
        fs.unlinkSync(filePath);
        return existing;
      }
    } catch (err) {
      console.error('DB lookup error:', err);
      fs.unlinkSync(filePath);
      throw err;
    }

    return new Promise((resolve, reject) => {
      const python = spawn('python3', ['./src/analysis/analyze_players.py', filePath]);

      let output = '';
      python.stdout.on('data', (data) => {
        output += data.toString();
      });

      python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      python.on('close', async (code) => {
        fs.unlinkSync(filePath);

        if (code !== 0) {
          return reject(new Error(`Python script exited with code ${code}`));
        }

        try {
          const result = JSON.parse(output);
          console.log(result);
          // Save match and player stats to the database
          const savedMatch = await this.saveMatchAndStats(result);
          resolve(savedMatch); // Return saved match with stats
        } catch (err) {
          console.error('Error parsing or saving:', err);
          reject(err);
        }
      });
    });
  }

  async saveMatchAndStats(data: any): Promise<any> {
    const existing = await this.prisma.match.findUnique({
      where: { matchId: data.match_id },
      include: { stats: true },
    });
  
    if (existing) {
      console.log(`Match ${data.match_id} already exists, returning existing.`);
      return existing;
    }
  
    const match = await this.prisma.match.create({
      data: {
        matchId: data.match_id ?? undefined,
        team1Score: data.team1_score,
        team2Score: data.team2_score,
        stats: {
          create: data.players.map((player) => ({
            steamId: player.steam_id,
            username: player.username,
            accuracy: parseFloat(player.accuracy),
            accuracySpotted: parseFloat(player.accuracy_spotted),
            hsAccuracy: parseFloat(player.hs_accuracy),
            timeToDamage: parseFloat(player.time_to_damage),
            crosshairPlacement: parseFloat(player.crosshair_placement),
            counterStrafing: parseFloat(player.counter_strafing),
            totalKills: player.total_kills,
            totalDeaths: player.total_deaths,
            openingKills: player.opening_kills,
            tradeKills: player.trade_kills,
            tradeKillPercentage: player.trade_kill_percentage,
            tradedDeaths: player.traded_deaths,
            tradedDeathPercentage: player.traded_death_percentage,
            multiKillRounds: player.multi_kill_rounds,
            multiKillPercentage: player.multi_kill_percentage,
            teamNumber: player.team_number ?? null, // ✅ assign team number
            player: {
              connectOrCreate: {
                where: { steamId: player.steam_id },
                create: { steamId: player.steam_id },
              },
            },
          })),
        },
      },
      include: { stats: true },
    });
  
    return match;
  }
  
}
