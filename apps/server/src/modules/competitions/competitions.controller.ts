
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';

@Controller('competitions')
export class CompetitionsController {
    constructor(private readonly competitionsService: CompetitionsService) { }

    @Post()
    create(@Body() body: { nom: string; sportId: string; championnatId?: string }) {
        return this.competitionsService.create(body);
    }

    @Get()
    findAll() {
        return this.competitionsService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.competitionsService.remove(id);
    }
}
