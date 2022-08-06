import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodsService {
  private foods: Food[] = [
    {
      id: 1,
      name: 'shrimp',
      description: 'Help',
      category: 'dry food',
      price: 99,
      components: ['bing', 'chilling'],
    },
  ];

  findAll() {
    return this.foods;
  }

  findOne(id: string) {
    const food = this.foods.find((item) => item.id === +id);
    if (!food) {
      throw new NotFoundException(`not found`);
    }
    return food;
  }

  create(createFoodDto: any) {
    this.foods.push(createFoodDto);
    return createFoodDto;
  }

  update(id: string, updateFoodDto: any) {
    const existingFood = this.findOne(id);
    if (existingFood) {
      //logic
    }
  }

  remove(id: string) {
    const foodIndex = this.foods.findIndex((item) => item.id === +id);
    if (foodIndex >= 0) {
      this.foods.splice(foodIndex, 1);
    }
  }
}
