import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Sport } from '@prisma/client';

/**
 * Service responsable de la gestion des sports.
 * Fournit les opérations CRUD via PrismaService.
 */
@Injectable()
export class SportsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crée un nouveau sport en base de données.
   * @param data - Objet contenant le nom et le type du sport.
   * @returns Le sport créé.
   */
  async create(data: { nom: string; type: string }): Promise<Sport> {
    return this.prisma.sport.create({
      data,
    });
  }

  /**
   * Récupère la liste de tous les sports.
   * @returns Tableau de tous les sports.
   */
  async findAll(): Promise<Sport[]> {
    return this.prisma.sport.findMany();
  }

  /**
   * Récupère un sport par son identifiant.
   * @param id - Identifiant UUID du sport.
   * @returns Le sport trouvé ou null.
   */
  async findOne(id: string): Promise<Sport | null> {
    return this.prisma.sport.findUnique({
      where: { id },
    });
  }

  /**
   * Supprime un sport par son identifiant.
   * @param id - Identifiant UUID du sport à supprimer.
   * @returns Le sport supprimé.
   */
  async remove(id: string): Promise<Sport> {
    return this.prisma.sport.delete({
      where: { id },
    });
  }
}
