
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Competition } from '@prisma/client';

@Injectable()
export class CompetitionsService {
    constructor(private prisma: PrismaService) { }

    async create(data: { nom: string; championnatId?: string }): Promise<Competition> {
        return this.prisma.competition.create({
            data,
        });
    }

    async findAll(): Promise<Competition[]> {
        return this.prisma.competition.findMany({
            include: { championnat: true, epreuves: true }
        });
    }

    async findOne(id: string): Promise<Competition | null> {
        return this.prisma.competition.findUnique({
            where: { id },
            include: { epreuves: true },
        });
    }

    async remove(id: string): Promise<Competition> {
        return this.prisma.competition.delete({
            where: { id },
        });
    }
}
