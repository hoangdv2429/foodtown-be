import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Food } from 'src/foods/entities/food.entity';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'food' })
  productId: string;

  @Prop()
  options: boolean[];

  @Prop()
  quantity: number;

  @Prop()
  food: Food;

  @Prop()
  subTotalPrice: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
