import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsService } from './competitions.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrisma = {
  competition: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

describe('CompetitionsService', () => {
  let service: CompetitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompetitionsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CompetitionsService>(CompetitionsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a competition', async () => {
      const data = { nom: 'Tournoi régional', championnatId: 'champ-1' };
      const expected = { id: 'uuid-1', ...data };
      mockPrisma.competition.create.mockResolvedValue(expected);

      const result = await service.create(data);

      expect(mockPrisma.competition.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all competitions with relations', async () => {
      const expected = [
        { id: 'uuid-1', nom: 'Tournoi', championnat: {}, epreuves: [] },
      ];
      mockPrisma.competition.findMany.mockResolvedValue(expected);

      const result = await service.findAll();

      expect(mockPrisma.competition.findMany).toHaveBeenCalledWith({
        include: { championnat: { include: { sport: true } }, epreuves: true },
      });
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a competition by id with relations', async () => {
      const expected = {
        id: 'uuid-1',
        nom: 'Tournoi',
        epreuves: [],
        championnat: {},
      };
      mockPrisma.competition.findUnique.mockResolvedValue(expected);

      const result = await service.findOne('uuid-1');

      expect(mockPrisma.competition.findUnique).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        include: { epreuves: true, championnat: { include: { sport: true } } },
      });
      expect(result).toEqual(expected);
    });

    it('should return null if competition not found', async () => {
      mockPrisma.competition.findUnique.mockResolvedValue(null);

      const result = await service.findOne('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should delete a competition by id', async () => {
      const expected = { id: 'uuid-1', nom: 'Tournoi' };
      mockPrisma.competition.delete.mockResolvedValue(expected);

      const result = await service.remove('uuid-1');

      expect(mockPrisma.competition.delete).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
      });
      expect(result).toEqual(expected);
    });
  });
});
