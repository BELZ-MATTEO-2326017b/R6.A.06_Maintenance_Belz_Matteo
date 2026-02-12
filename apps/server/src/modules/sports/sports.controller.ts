
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SportsService } from './sports.service';

@Controller('sports')
export class SportsController {
    constructor(private readonly sportsService: SportsService) { }

    @Post()
    create(@Body() body: { nom: string; type: string }) {
        return this.sportsService.create(body);
    }

    @Get()
    findAll() {
        return this.sportsService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sportsService.remove(id);
    }
}
