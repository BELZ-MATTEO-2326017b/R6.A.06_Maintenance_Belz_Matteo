import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Competition } from '@prisma/client';

/**
 * Service responsable de la gestion des compétitions.
 * Fournit les opérations CRUD avec inclusion des relations (sport, championnat, épreuves).
 */
@Injectable()
export class CompetitionsService {
    constructor(private prisma: PrismaService) { }

    /**
     * Crée une nouvelle compétition liée à un championnat.
     * @param data - Objet contenant le nom et le championnatId.
     * @returns La compétition créée.
     */
    async create(data: { nom: string; championnatId: string }): Promise<Competition> {
        return this.prisma.competition.create({
            data,
        });
    }

    /**
     * Récupère toutes les compétitions avec leurs relations (championnat, épreuves).
     * @returns Tableau de toutes les compétitions.
     */
    async findAll(): Promise<Competition[]> {
        return this.prisma.competition.findMany({
            include: { championnat: { include: { sport: true } }, epreuves: true }
        });
    }

    /**
     * Récupère une compétition par son identifiant avec ses épreuves.
     * @param id - Identifiant UUID de la compétition.
     * @returns La compétition trouvée ou null.
     */
    async findOne(id: string): Promise<Competition | null> {
        return this.prisma.competition.findUnique({
            where: { id },
            include: { epreuves: true, championnat: { include: { sport: true } } },
        });
    }

    /**
     * Supprime une compétition par son identifiant.
     * @param id - Identifiant UUID de la compétition à supprimer.
     * @returns La compétition supprimée.
     */
    async remove(id: string): Promise<Competition> {
        return this.prisma.competition.delete({
            where: { id },
        });
    }
}
