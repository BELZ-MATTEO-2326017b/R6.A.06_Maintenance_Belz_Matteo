
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ChampionnatsService } from './championnats.service';

@Controller('championnats')
export class ChampionnatsController {
    constructor(private readonly championnatsService: ChampionnatsService) { }

    @Post()
    create(@Body() body: { nom: string }) {
        return this.championnatsService.create(body);
    }

    @Get()
    findAll() {
        return this.championnatsService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.championnatsService.remove(id);
    }
}
