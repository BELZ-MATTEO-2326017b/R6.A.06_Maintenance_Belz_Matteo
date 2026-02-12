import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SportsModule } from './modules/sports/sports.module';
import { CompetitionsModule } from './modules/competitions/competitions.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChampionnatsModule } from './modules/championnats/championnats.module';

@Module({
  imports: [SportsModule, CompetitionsModule, ChampionnatsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
