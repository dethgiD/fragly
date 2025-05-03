import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
const SteamUser = require('steam-user');
const GlobalOffensive = require('globaloffensive');
const { generateAuthCode } = require('steam-totp');
import { decodeMatchShareCode } from 'csgo-sharecode';

@Injectable()
export class SteamService implements OnModuleInit {
  private client = new SteamUser();
  private csgo: any;
  private readonly logger = new Logger(SteamService.name);
  private isReady = false;

  onModuleInit() {
    this.logger.log('🔑 Logging into Steam...');
    this.client.logOn({
      accountName: process.env.STEAM_USERNAME!,
      password: process.env.STEAM_PASSWORD!,
    });

    this.client.on('loggedOn', () => {
      this.logger.log('✅ Logged into Steam');
      this.client.setPersona(SteamUser.EPersonaState.Online);     
      this.logger.log("✅ User Online");
      this.csgo = new GlobalOffensive(this.client);
      this.client.gamesPlayed([730]);
      this.logger.log('🎮 Playing CS2...');
      this.csgo.on('connectedToGC', () => {
          this.logger.log('✅ Connected to CS2 Game Coordinator');
          this.isReady = true;
        });

      this.csgo.on('disconnectedFromGC', () => {
          this.logger.warn('⚠️ Disconnected from GC');
          this.isReady = false;
        });

      this.csgo.on('error', (err: any) => {
          this.logger.error('❌ CS:GO error:', err);
        });
    });

    this.client.on('error', (err: any) => {
      this.logger.error('❌ Steam error:', err);
    });
  }

  async getMatchInfoFromShareCode(shareCode: string): Promise<any> {
    if (!this.isReady) {
      throw new Error("⛔ Not yet connected to CS2 Game Coordinator. Try again shortly.");
    }

    return new Promise((resolve, reject) => {
      const raw = decodeMatchShareCode(shareCode);

      this.csgo.once('matchList', (matches: any[]) => {
        if (matches.length > 0) {
          resolve(matches[0]);
        } else {
          reject(new Error("No matches found in matchList"));
        }
      });

      const decoded = {
        matchId: raw.matchId.toString(),
        outcomeId: raw.reservationId.toString(),
        token: raw.tvPort.toString(),
      };

      this.logger.log(`📥 Requesting match info for ${decoded.matchId}`);
      this.csgo.requestGame(decoded);
    });
  }
}
