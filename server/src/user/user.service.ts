import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      email: user.email,
      displayName: user.displayName,
    };
  }

  async updateUserProfile(userId: string, displayName: string, email: string) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { displayName, email },
    });

    return {
      message: 'Profile updated successfully',
      user: updatedUser,
    };
  }
}
