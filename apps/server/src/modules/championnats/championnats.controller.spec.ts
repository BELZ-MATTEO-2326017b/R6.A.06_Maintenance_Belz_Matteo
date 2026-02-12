import { Test, TestingModule } from '@nestjs/testing';
import { ChampionnatsController } from './championnats.controller';
import { ChampionnatsService } from './championnats.service';

const mockChampionnatsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
};

describe('ChampionnatsController', () => {
  let controller: ChampionnatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChampionnatsController],
      providers: [
        { provide: ChampionnatsService, useValue: mockChampionnatsService },
      ],
    }).compile();

    controller = module.get<ChampionnatsController>(ChampionnatsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a championnat via the service', async () => {
      const body = { nom: 'Championnat départemental', sportId: 'sport-1' };
      const expected = { id: 'uuid-1', ...body };
      mockChampionnatsService.create.mockResolvedValue(expected);

      const result = await controller.create(body);

      expect(mockChampionnatsService.create).toHaveBeenCalledWith(body);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all championnats', async () => {
      const expected = [{ id: 'uuid-1', nom: 'Championnat régional', competitions: [] }];
      mockChampionnatsService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(mockChampionnatsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove a championnat by id', async () => {
      const expected = { id: 'uuid-1', nom: 'Championnat régional' };
      mockChampionnatsService.remove.mockResolvedValue(expected);

      const result = await controller.remove('uuid-1');

      expect(mockChampionnatsService.remove).toHaveBeenCalledWith('uuid-1');
      expect(result).toEqual(expected);
    });
  });
});
