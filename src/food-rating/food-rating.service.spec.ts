import { Test, TestingModule } from '@nestjs/testing';
import { FoodRatingService } from './food-rating.service';

describe('FoodRatingService', () => {
  let service: FoodRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodRatingService],
    }).compile();

    service = module.get<FoodRatingService>(FoodRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
