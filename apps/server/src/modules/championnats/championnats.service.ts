
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Championnat } from '@prisma/client';

@Injectable()
export class ChampionnatsService {
    constructor(private prisma: PrismaService) { }

    async create(data: { nom: string }): Promise<Championnat> {
        return this.prisma.championnat.create({
            data,
        });
    }

    async findAll(): Promise<Championnat[]> {
        return this.prisma.championnat.findMany({
            include: { competitions: true },
        });
    }

    async findOne(id: string): Promise<Championnat | null> {
        return this.prisma.championnat.findUnique({
            where: { id },
            include: { competitions: true },
        });
    }

    async remove(id: string): Promise<Championnat> {
        return this.prisma.championnat.delete({
            where: { id },
        });
    }
}
