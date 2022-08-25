import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<Food>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.foodModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const food = await this.foodModel.findOne({ _id: id }).exec();
    if (!food) {
      throw new NotFoundException(`#${id} not found`);
    }
    return food;
  }

  create(createFoodDto: CreateFoodDto) {
    const food = new this.foodModel(createFoodDto);
    return food.save();
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const existingFood = this.foodModel
      .findOneAndUpdate({ _id: id }, { $set: updateFoodDto }, { new: true })
      .exec();

    if (!existingFood) {
      throw new NotFoundException(`#${id} not found`);
    }
    return existingFood;
  }

  async remove(id: string) {
    const food = await this.findOne(id);
    return food.remove();
  }

  async recommendFood(food: Food) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      food.recommendations++;

      const recommendEvent = new this.eventModel({
        name: 'recommend_food',
        type: 'food',
        payload: { foodId: food.id },
      });
      await recommendEvent.save({ session });
      await food.save({ session });

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }

  async findWithout(without: string) {
    const foods = await this.foodModel.find();

    return foods.filter((food) => food.id != without);
  }
}
