import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { AnalysisService } from 'src/analysis/analysis.service';

@Injectable()
export class UploadService {
  constructor(private readonly analysisService: AnalysisService) {}

  async handleFile(file: Express.Multer.File): Promise<any> {
    return this.analysisService.analyzeAndSaveFromUpload(file);
  }
}
