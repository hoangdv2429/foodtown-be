import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Components } from './entities/components.entity';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    @InjectRepository(Components)
    private readonly componentRepository: Repository<Components>,
  ) {}

  findAll() {
    return this.foodRepository.find({
      relations: ['components'],
    });
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOne({
      where: { id: id },
      relations: ['components'],
    });
    if (!food) {
      throw new NotFoundException(`not found`);
    }
    return food;
  }

  async create(createFoodDto: CreateFoodDto) {
    const components = await Promise.all(
      createFoodDto.components.map((name) =>
        this.preloadComponentsByName(name),
      ),
    );
    const food = this.foodRepository.create({ ...createFoodDto, components });
    return this.foodRepository.save(food);
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const components =
      updateFoodDto.components &&
      (await Promise.all(
        updateFoodDto.components.map((name) =>
          this.preloadComponentsByName(name),
        ),
      ));

    const food = await this.foodRepository.preload({
      id: +id,
      ...updateFoodDto,
      components,
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

  private async preloadComponentsByName(name: string): Promise<Components> {
    const existingComponent = await this.componentRepository.findOne({
      where: { name: name },
    });
    if (existingComponent) {
      return existingComponent;
    }
    return this.componentRepository.create({ name });
  }
}
