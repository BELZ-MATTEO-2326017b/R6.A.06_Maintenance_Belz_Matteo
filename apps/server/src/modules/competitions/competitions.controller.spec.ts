import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';

const mockCompetitionsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
};

describe('CompetitionsController', () => {
  let controller: CompetitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitionsController],
      providers: [
        { provide: CompetitionsService, useValue: mockCompetitionsService },
      ],
    }).compile();

    controller = module.get<CompetitionsController>(CompetitionsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a competition via the service', async () => {
      const body = { nom: 'Tournoi régional', championnatId: 'champ-1' };
      const expected = { id: 'uuid-1', ...body };
      mockCompetitionsService.create.mockResolvedValue(expected);

      const result = await controller.create(body);

      expect(mockCompetitionsService.create).toHaveBeenCalledWith(body);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all competitions', async () => {
      const expected = [{ id: 'uuid-1', nom: 'Tournoi' }];
      mockCompetitionsService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(mockCompetitionsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove a competition by id', async () => {
      const expected = { id: 'uuid-1', nom: 'Tournoi' };
      mockCompetitionsService.remove.mockResolvedValue(expected);

      const result = await controller.remove('uuid-1');

      expect(mockCompetitionsService.remove).toHaveBeenCalledWith('uuid-1');
      expect(result).toEqual(expected);
    });
  });
});
