import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AnalysisModule } from 'src/analysis/analysis.module';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [PrismaModule, AnalysisModule],
  exports: [UploadService],
})
export class UploadModule {}
