import { Controller, DefaultValuePipe, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { AuthGuard } from '@nestjs/passport';
import { ParseIntPipe } from '@nestjs/common';

@Controller('matches')
@UseGuards(AuthGuard('jwt'))
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  async getAllMatches(@Req() req) {
    return await this.matchService.getMatchesForPlayer(req.user.steamId);
  }

  @Get('sync')
  async syncMatches(@Req() req) {
    return await this.matchService.syncMatchesForUser(req.user.userId);
  }

  @Get(':id')
  async getMatchById(@Param('id') id: string) {
    return await this.matchService.getMatchById(id);
  }


  @Get('user/progress')
  async getUserProgress(
    @Req() req, 
    @Query('limit',
      new DefaultValuePipe(20),
      ParseIntPipe
    ) limit: number,
  ): Promise<any> { 

    const steamId = req.user?.steamId;
    if (!steamId) {
      throw new Error("User Steam ID not found in authentication token.");
    }
    const actualLimit = Math.max(1, Math.min(limit, 50));

    return this.matchService.findUserProgress(steamId, actualLimit);
  }
}
