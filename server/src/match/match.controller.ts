import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('matches')
@UseGuards(AuthGuard('jwt')) // ✅ Protect all match routes
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
}
