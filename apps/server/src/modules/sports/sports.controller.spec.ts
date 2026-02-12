import { Test, TestingModule } from '@nestjs/testing';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';

const mockSportsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
};

describe('SportsController', () => {
  let controller: SportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportsController],
      providers: [{ provide: SportsService, useValue: mockSportsService }],
    }).compile();

    controller = module.get<SportsController>(SportsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a sport via the service', async () => {
      const body = { nom: 'Football', type: 'EQUIPE' };
      const expected = { id: 'uuid-1', ...body };
      mockSportsService.create.mockResolvedValue(expected);

      const result = await controller.create(body);

      expect(mockSportsService.create).toHaveBeenCalledWith(body);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all sports', async () => {
      const expected = [{ id: 'uuid-1', nom: 'Football', type: 'EQUIPE' }];
      mockSportsService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(mockSportsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove a sport by id', async () => {
      const expected = { id: 'uuid-1', nom: 'Football', type: 'EQUIPE' };
      mockSportsService.remove.mockResolvedValue(expected);

      const result = await controller.remove('uuid-1');

      expect(mockSportsService.remove).toHaveBeenCalledWith('uuid-1');
      expect(result).toEqual(expected);
    });
  });
});
