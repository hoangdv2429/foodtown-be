import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type CategoryDocument = Order & Document;

@Schema()
export class Order {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Order);
