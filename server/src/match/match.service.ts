import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { decodeMatchShareCode } from 'csgo-sharecode';
import * as fs from 'fs';
import * as path from 'path';
import * as bz2 from 'unbzip2-stream';

@Injectable()
export class MatchService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly uploadService: UploadService,
      ) {}
  async getAllMatches() {
    return this.prisma.match.findMany({
      orderBy: { playedAt: 'desc' },
      include: {
        stats: true,
      },
    });
  }

  async getMatchesForPlayer(steamId: string) {
    return this.prisma.match.findMany({
      where: {
        stats: {
          some: {
            steamId,
          },
        },
      },
      orderBy: { playedAt: 'desc' },
      include: { stats: true },
    });
  }
  

  async getMatchById(id: string) {
    const match = await this.prisma.match.findUnique({
      where: { id },
      include: {
        stats: true,
      },
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    return match;
  }

  async downloadDemo(url: string, outPath: string): Promise<void> {
    const response = await axios.get(url, { responseType: 'stream' });
    const bunzip = bz2();
    const writeStream = fs.createWriteStream(outPath);

    return new Promise((resolve, reject) => {
      response.data.pipe(bunzip).pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  }

  async syncMatchesForUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.gameAuthCode || !user?.lastMatchCode) {
      throw new Error("Missing gameAuthCode or lastMatchCode");
    }
  
    const player = await this.prisma.player.findFirst({ where: { user: { id: userId } } });
    if (!player) throw new Error("No player linked to user");
    const steamId = player.steamId;
  
    let currentCode = user.lastMatchCode;
    const syncedMatches: string[] = [];
  
    while (true) {
      const res = await axios.get(
        `https://api.steampowered.com/ICSGOPlayers_730/GetNextMatchSharingCode/v1`,
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
        const { matchId, reservationId, tvPort } = decodeMatchShareCode(nextCode);
  
        const matchIdStr = matchId.toString();
        const reservationIdStr = reservationId.toString();
        const tokenIdStr = tvPort.toString(); // Use tvPort for token in this version
  
        const downloadUrl = `https://replay${matchIdStr.slice(-1)}.valve.net/730/${matchIdStr}_${reservationIdStr}_${tokenIdStr}.dem.bz2`;
        const outPath = path.resolve(`./downloads/${matchIdStr}.dem`);
  
        await this.downloadDemo(downloadUrl, outPath);
        await this.uploadService.handleFile({ path: outPath } as Express.Multer.File);
        syncedMatches.push(matchIdStr);
  
        fs.unlinkSync(outPath);
        currentCode = nextCode;
      } catch (err) {
        console.error("Error syncing match from code", nextCode, err);
        break;
      }
    }
  
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastMatchCode: currentCode },
    });
  
    return { success: true, syncedMatches };
  }
}
