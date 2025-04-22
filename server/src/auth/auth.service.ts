import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAuthCodesDto } from './dto/update-auth-codes.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateOrCreateUser(steamId: string, username: string) {
    // Find existing player
    let player = await this.prisma.player.findUnique({
      where: { steamId },
      include: { user: true },
    });
    
    // If not exists, create both Player and User
    if (!player) {
      player = await this.prisma.player.create({
        data: {
          steamId,
          user: {
            create: {
              email: `${steamId}@steam`, // Placeholder, Steam doesn't give email
            },
          },
        },
        include: { user: true },
      });
    } else if(!player.user){
      const user = await this.prisma.user.create({
        data: {
          email: `${steamId}@steam`,
          player: { connect: { id: player.id } },
        },
      });

      // Re-fetch player with user
      player = await this.prisma.player.findUnique({
      where: { steamId },
      include: { user: true },
      });
      if(!player) {
        throw new Error("Player not found after creating user.");
      }
    }

    if (!player.user) {
        throw new Error("User not found for player.");
      }

    // Generate JWT with User ID
    const payload = {
      sub: player.user.id,
      steamId: player.steamId,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }

  async updateSteamCodes(userId: string, dto: UpdateAuthCodesDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        gameAuthCode: dto.gameAuthCode,
        lastMatchCode: dto.lastMatchCode,
      },
    });
  }
}
