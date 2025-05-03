import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AnalysisService],
  exports: [AnalysisService],
  imports: [PrismaModule],
})
export class AnalysisModule {}
