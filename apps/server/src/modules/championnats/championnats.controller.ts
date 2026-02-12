import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ChampionnatsService } from './championnats.service';
import { CreateChampionnatDto } from './dto/create-championnat.dto';

/**
 * Contrôleur REST pour la ressource Championnat.
 * Expose les endpoints CRUD sur le préfixe `/championnats`.
 */
@Controller('championnats')
export class ChampionnatsController {
  constructor(private readonly championnatsService: ChampionnatsService) { }

  /**
   * POST /championnats — Crée un nouveau championnat.
   * @param body - Corps de la requête contenant le nom et le sportId.
   */
  @Post()
  create(@Body() body: CreateChampionnatDto) {
    return this.championnatsService.create(body);
  }

  /**
   * GET /championnats — Récupère tous les championnats.
   */
  @Get()
  findAll() {
    return this.championnatsService.findAll();
  }

  /**
   * DELETE /championnats/:id — Supprime un championnat par son identifiant.
   * @param id - Identifiant UUID du championnat.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.championnatsService.remove(id);
  }
}
