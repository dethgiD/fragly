import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAuthCodesDto } from './dto/update-auth-codes.dto';
import { Prisma } from 'generated/prisma/client';

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
              
            },
          },
        },
        include: { user: true },
      });
    } else if(!player.user){
      const user = await this.prisma.user.create({
        data: {
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

    const isIncomplete = !player.user.email || !player.user.displayName;
    // Generate JWT with User ID
    const payload = {
      sub: player.user.id,
      steamId: player.steamId,
      needsSetup: isIncomplete,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }

  async completeProfile(userId: string, email: string, displayName: string) {
    try {
      // Attempt to update the user profile
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          email: email?.toLowerCase(), // Normalize email if needed
          displayName: displayName,
        },
      });
      return updatedUser; // Or return relevant user data without sensitive info

    } catch (error) {
      // Check if the error is a Prisma unique constraint violation (P2002)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Determine which field caused the conflict from the error metadata
        const target = error.meta?.target as string[]; // e.g., ['displayName'] or ['email']
        let conflictMessage = 'A profile conflict occurred.'; // Default message

        if (target?.includes('displayName') && target?.includes('email')) {
            conflictMessage = 'That display name and email address are already in use.';
        } else if (target?.includes('displayName')) {
          conflictMessage = 'That display name is already taken. Please choose another.';
        } else if (target?.includes('email')) {
          conflictMessage = 'That email address is already associated with another account.';
        }

        // Throw a 409 Conflict exception with the specific message
        throw new ConflictException(conflictMessage);
      }

      // Handle other potential database errors or unexpected issues
      console.error('Error during profile completion:', error); // Log the original error
      throw new InternalServerErrorException(
        'An unexpected error occurred while updating your profile.',
      );
    }
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
