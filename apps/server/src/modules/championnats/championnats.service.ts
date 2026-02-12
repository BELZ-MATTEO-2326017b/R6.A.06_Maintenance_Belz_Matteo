import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Championnat } from '@prisma/client';

/**
 * Service responsable de la gestion des championnats.
 * Fournit les opérations CRUD avec inclusion des compétitions associées.
 */
@Injectable()
export class ChampionnatsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crée un nouveau championnat.
   * @param data - Objet contenant le nom du championnat et l'identifiant du sport associé.
   * @returns Le championnat créé.
   */
  async create(data: { nom: string; sportId: string }): Promise<Championnat> {
    return this.prisma.championnat.create({
      data,
    });
  }

  /**
   * Récupère tous les championnats avec leurs compétitions et le sport associé.
   * @returns Tableau de tous les championnats.
   */
  async findAll(): Promise<Championnat[]> {
    return this.prisma.championnat.findMany({
      include: { sport: true, competitions: true },
    });
  }

  /**
   * Récupère un championnat par son identifiant avec ses compétitions et son sport.
   * @param id - Identifiant UUID du championnat.
   * @returns Le championnat trouvé ou null.
   */
  async findOne(id: string): Promise<Championnat | null> {
    return this.prisma.championnat.findUnique({
      where: { id },
      include: { sport: true, competitions: true },
    });
  }

  /**
   * Supprime un championnat par son identifiant.
   * @param id - Identifiant UUID du championnat à supprimer.
   * @returns Le championnat supprimé.
   */
  async remove(id: string): Promise<Championnat> {
    return this.prisma.championnat.delete({
      where: { id },
    });
  }
}
