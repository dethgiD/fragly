import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-steam';
import { AuthService } from './auth.service';
import { Profile } from 'passport';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(private readonly authService: AuthService) {
    super({
      returnURL: `${process.env.API_BASE_URL}/auth/steam/return`,
      realm: `${process.env.API_BASE_URL}/`,
      apiKey: process.env.STEAM_API_KEY!,
    });
  }

  async validate(identifier: string, profile: Profile, done: Function) {
    const steamId = profile.id;
    const username = profile.displayName;
    const user = await this.authService.validateOrCreateUser(steamId, username);
    done(null, user);
  }
}
