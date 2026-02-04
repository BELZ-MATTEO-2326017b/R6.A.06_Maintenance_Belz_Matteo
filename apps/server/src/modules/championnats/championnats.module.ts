
import { Module } from '@nestjs/common';
import { ChampionnatsService } from './championnats.service';
import { ChampionnatsController } from './championnats.controller';

@Module({
    controllers: [ChampionnatsController],
    providers: [ChampionnatsService],
})
export class ChampionnatsModule { }
