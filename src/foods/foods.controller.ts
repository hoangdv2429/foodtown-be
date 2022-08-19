import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodsService } from './foods.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  //Get All food
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.foodsService.findAll(paginationQuery);
  }

  //Get specefic food
  @Get(':id')
  findOne(@Param('id') id: string) {
    // console.log(typeof id);

    return this.foodsService.findOne('' + id);
  }

  //Create A food
  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    // console.log(createFoodDto instanceof CreateFoodDto);

    return this.foodsService.create(createFoodDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}
