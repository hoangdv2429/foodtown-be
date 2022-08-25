import { Module } from '@nestjs/common';
import { FoodsModule } from 'src/foods/foods.module';
import { FoodRatingService } from './food-rating.service';

@Module({
  imports: [FoodsModule],
  providers: [FoodRatingService],
})
export class FoodRatingModule {}
