
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Sport, SportType } from '@prisma/client';

@Injectable()
export class SportsService {
    constructor(private prisma: PrismaService) { }

    async create(data: { nom: string; type: SportType }): Promise<Sport> {
        return this.prisma.sport.create({
            data,
        });
    }

    async findAll(): Promise<Sport[]> {
        return this.prisma.sport.findMany();
    }

    async findOne(id: string): Promise<Sport | null> {
        return this.prisma.sport.findUnique({
            where: { id },
        });
    }

    async remove(id: string): Promise<Sport> {
        return this.prisma.sport.delete({
            where: { id },
        });
    }
}
