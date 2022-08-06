import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  //Get All food
  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.foodsService.findAll();
  }

  //Get specefic food
  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id);

    return this.foodsService.findOne('' + id);
  }

  //Create A food
  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    console.log(createFoodDto instanceof CreateFoodDto);

    return this.foodsService.create(createFoodDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    // return `This action updates #${id} and #${name}`;
    return this.foodsService.update(id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}
