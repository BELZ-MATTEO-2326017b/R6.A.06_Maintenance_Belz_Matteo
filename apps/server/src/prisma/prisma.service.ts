import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service Prisma — wrapper injectable autour de PrismaClient.
 * Gère automatiquement la connexion et la déconnexion à la base de données
 * en suivant le cycle de vie des modules NestJS.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /** Ouvre la connexion à la base de données au démarrage du module. */
  async onModuleInit() {
    await this.$connect();
  }

  /** Ferme proprement la connexion à la base de données à l'arrêt du module. */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
