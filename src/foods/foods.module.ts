import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Components } from './entities/components.entity';
import { Food } from './entities/food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Components])],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
