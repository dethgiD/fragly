import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [MatchController],
  providers: [MatchService, PrismaService, UploadService],
})
export class MatchModule {}
