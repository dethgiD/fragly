import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { SteamModule } from 'src/steam/steam.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadModule } from 'src/upload/upload.module';
import { AnalysisModule } from 'src/analysis/analysis.module';

@Module({
  controllers: [MatchController],
  providers: [MatchService],
  imports: [SteamModule, PrismaModule, UploadModule, AnalysisModule],
})
export class MatchModule {}
