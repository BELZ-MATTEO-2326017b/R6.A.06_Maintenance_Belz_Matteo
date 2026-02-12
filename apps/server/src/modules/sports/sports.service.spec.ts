import { Test, TestingModule } from '@nestjs/testing';
import { SportsService } from './sports.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrisma = {
  sport: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

describe('SportsService', () => {
  let service: SportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SportsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<SportsService>(SportsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a sport', async () => {
      const data = { nom: 'Football', type: 'EQUIPE' };
      const expected = { id: 'uuid-1', ...data };
      mockPrisma.sport.create.mockResolvedValue(expected);

      const result = await service.create(data);

      expect(mockPrisma.sport.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all sports', async () => {
      const expected = [
        { id: 'uuid-1', nom: 'Football', type: 'EQUIPE' },
        { id: 'uuid-2', nom: 'Athlétisme', type: 'INDIV' },
      ];
      mockPrisma.sport.findMany.mockResolvedValue(expected);

      const result = await service.findAll();

      expect(mockPrisma.sport.findMany).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return a sport by id', async () => {
      const expected = { id: 'uuid-1', nom: 'Football', type: 'EQUIPE' };
      mockPrisma.sport.findUnique.mockResolvedValue(expected);

      const result = await service.findOne('uuid-1');

      expect(mockPrisma.sport.findUnique).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
      });
      expect(result).toEqual(expected);
    });

    it('should return null if sport not found', async () => {
      mockPrisma.sport.findUnique.mockResolvedValue(null);

      const result = await service.findOne('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should delete a sport by id', async () => {
      const expected = { id: 'uuid-1', nom: 'Football', type: 'EQUIPE' };
      mockPrisma.sport.delete.mockResolvedValue(expected);

      const result = await service.remove('uuid-1');

      expect(mockPrisma.sport.delete).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
      });
      expect(result).toEqual(expected);
    });
  });
});
