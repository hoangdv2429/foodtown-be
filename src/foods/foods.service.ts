import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  findAll() {
    return this.foodRepository.find();
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOne({ where: { id: id } });
    if (!food) {
      throw new NotFoundException(`not found`);
    }
    return food;
  }

  create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(food);
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.preload({
      id: +id,
      ...updateFoodDto,
    });
    if (!food) {
      throw new NotFoundException(`food #${id} not found`);
    }

    return this.foodRepository.save(food);
  }

  async remove(id: number) {
    const food = await this.findOne(id);
    return this.foodRepository.remove(food);
  }
}
