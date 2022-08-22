import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Transform } from 'class-transformer';
import { Cart } from 'src/cart/schemas/cart.schema';
import { Status } from './enums/status.enum';
import { Address } from 'src/users/address.schema';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ ref: 'Cart' })
  cart: Cart;

  @Prop({ required: true })
  address: Address;

  @Prop({ default: Status.Pending })
  status: Status;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
