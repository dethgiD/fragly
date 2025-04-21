import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  async handleFile(file: Express.Multer.File): Promise<any> {
    const filePath = path.resolve(file.path);

    return new Promise((resolve, reject) => {
      // Start the Python process with the demo file path as argument
      const python = spawn('python3', ['./src/analysis/analyze.py', filePath]);

      let output = '';
      python.stdout.on('data', (data) => {
        output += data.toString();
      });

      python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      python.on('close', (code) => {
        // Clean up the uploaded file after analysis
        fs.unlinkSync(filePath);

        if (code !== 0) {
          return reject(new Error(`Python script exited with code ${code}`));
        }

        try {
            console.log('Python script output:', output);
          const result = JSON.parse(output);
          resolve(result);  // Returning the analysis results
        } catch (err) {
          console.error('Error parsing Python script output:', err);
          reject(err);
        }
      });
    });
  }
}

