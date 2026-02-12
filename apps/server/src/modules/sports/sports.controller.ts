import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SportsService } from './sports.service';
import { CreateSportDto } from './dto/create-sport.dto';

/**
 * Contrôleur REST pour la ressource Sport.
 * Expose les endpoints CRUD sur le préfixe `/sports`.
 */
@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) { }

  /**
   * POST /sports — Crée un nouveau sport.
   * @param body - Corps de la requête contenant nom et type.
   */
  @Post()
  create(@Body() body: CreateSportDto) {
    return this.sportsService.create(body);
  }

  /**
   * GET /sports — Récupère la liste de tous les sports.
   */
  @Get()
  findAll() {
    return this.sportsService.findAll();
  }

  /**
   * DELETE /sports/:id — Supprime un sport par son identifiant.
   * @param id - Identifiant UUID du sport.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportsService.remove(id);
  }
}
