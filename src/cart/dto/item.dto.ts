import { Food } from 'src/foods/entities/food.entity';

export class ItemDTO {
  productId: string;
  quantity: number;
  options: boolean[];
  food: Food;
}
