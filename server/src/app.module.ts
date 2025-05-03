import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MatchModule } from './match/match.module';
import { AuthModule } from './auth/auth.module';
import { SteamModule } from './steam/steam.module';
import { AnalysisModule } from './analysis/analysis.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadModule, 
    PrismaModule, MatchModule, AuthModule, SteamModule, AnalysisModule, UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
