import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Food extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  price: number;

  @Prop([String])
  components: string[];

  @Prop({ default: 0 })
  recommendations: number;
}

export const FoodsSchema = SchemaFactory.createForClass(Food);
