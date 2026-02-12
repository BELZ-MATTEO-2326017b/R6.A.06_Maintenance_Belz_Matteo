import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';

/**
 * Contrôleur REST pour la ressource Competition.
 * Expose les endpoints CRUD sur le préfixe `/competitions`.
 */
@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  /**
   * POST /competitions — Crée une nouvelle compétition.
   * @param body - Corps de la requête contenant nom et championnatId.
   */
  @Post()
  create(@Body() body: CreateCompetitionDto) {
    return this.competitionsService.create(body);
  }

  /**
   * GET /competitions — Récupère la liste de toutes les compétitions.
   */
  @Get()
  findAll() {
    return this.competitionsService.findAll();
  }

  /**
   * DELETE /competitions/:id — Supprime une compétition par son identifiant.
   * @param id - Identifiant UUID de la compétition.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competitionsService.remove(id);
  }
}
