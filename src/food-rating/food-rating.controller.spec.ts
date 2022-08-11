import { Test, TestingModule } from '@nestjs/testing';
import { FoodRatingController } from './food-rating.controller';

describe('FoodRatingController', () => {
  let controller: FoodRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodRatingController],
    }).compile();

    controller = module.get<FoodRatingController>(FoodRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
