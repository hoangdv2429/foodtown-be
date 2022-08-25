import { Injectable } from '@nestjs/common';
import { FoodsService } from 'src/foods/foods.service';

@Injectable()
export class FoodRatingService {
  constructor(private readonly foodsService: FoodsService) {}
}
