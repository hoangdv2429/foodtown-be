import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Transform } from 'class-transformer';
import { Cart } from 'src/cart/schemas/cart.schema';
import { Status } from './enums/status.enum';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Cart' })
  cart: Cart;

  @Prop({ default: Status.Pending })
  status: Status;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
