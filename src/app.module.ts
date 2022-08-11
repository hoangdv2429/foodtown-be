import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';
import { FoodRatingController } from './food-rating/food-rating.controller';
import { FoodRatingService } from './food-rating/food-rating.service';
import { FoodRatingModule } from './food-rating/food-rating.module';

@Module({
  imports: [
    FoodsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/foodtown-mongo'),
    FoodRatingModule,
  ],
  controllers: [AppController, FoodRatingController],
  providers: [AppService, FoodRatingService],
})
export class AppModule {}
