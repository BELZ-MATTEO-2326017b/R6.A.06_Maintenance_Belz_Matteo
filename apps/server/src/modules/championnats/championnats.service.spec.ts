import { Test, TestingModule } from '@nestjs/testing';
import { ChampionnatsService } from './championnats.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrisma = {
  championnat: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ChampionnatsService', () => {
  let service: ChampionnatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChampionnatsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ChampionnatsService>(ChampionnatsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a championnat', async () => {
      const data = { nom: 'Championnat régional', sportId: 'sport-1' };
      const expected = { id: 'uuid-1', ...data };
      mockPrisma.championnat.create.mockResolvedValue(expected);

      const result = await service.create(data);

      expect(mockPrisma.championnat.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all championnats with competitions and sports', async () => {
      const expected = [
        {
          id: 'uuid-1',
          nom: 'Championnat régional',
          sport: { id: 'sport-1', nom: 'Football' },
          competitions: [{ id: 'comp-1', nom: 'Tournoi' }],
        },
      ];
      mockPrisma.championnat.findMany.mockResolvedValue(expected);

      const result = await service.findAll();

      expect(mockPrisma.championnat.findMany).toHaveBeenCalledWith({
        include: { sport: true, competitions: true },
      });
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a championnat by id with competitions and sport', async () => {
      const expected = { id: 'uuid-1', nom: 'Championnat régional', competitions: [], sport: {} };
      mockPrisma.championnat.findUnique.mockResolvedValue(expected);

      const result = await service.findOne('uuid-1');

      expect(mockPrisma.championnat.findUnique).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        include: { sport: true, competitions: true },
      });
      expect(result).toEqual(expected);
    });

    it('should return null if championnat not found', async () => {
      mockPrisma.championnat.findUnique.mockResolvedValue(null);

      const result = await service.findOne('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should delete a championnat by id', async () => {
      const expected = { id: 'uuid-1', nom: 'Championnat régional' };
      mockPrisma.championnat.delete.mockResolvedValue(expected);

      const result = await service.remove('uuid-1');

      expect(mockPrisma.championnat.delete).toHaveBeenCalledWith({ where: { id: 'uuid-1' } });
      expect(result).toEqual(expected);
    });
  });
});
