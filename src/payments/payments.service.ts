import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { PaymentDTO } from './dto/payment.dto';
import { Payment } from './payments.schema';
import { Address } from 'src/users/address.schema';
import AddressDTO from 'src/users/dto/address.dto';

@Injectable()
export class PaymentsService {
  constructor(
    // @InjectConnection() private readonly connection: Connection, // for using session when checking out
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    private readonly cartService: CartService,
  ) {}

  async findAll() {
    const payments = await this.paymentModel.find();
    return payments;
  }

  // async findByUserId(id: string) {
  //   const payment = await this.paymentModel.find({ cart.userId: id}).exec();
  //   return payment;
  // }

  async getOrderByFillter() {
    //To-Do
  }

  async create(id: string, deliverAddress: AddressDTO) {
    let newPayment;
    const currentCart = await this.cartService.getCart(id);
    console.log('cart to be bought ====>>>', currentCart);
    if (currentCart?.items.length == 0) {
      throw new BadRequestException('no items to checkout currentCart.userId');
    } else {
      newPayment = new this.paymentModel({
        cart: currentCart,
        address: deliverAddress,
      });
    }

    //reset user Cart after checkout
    this.cartService.deleteCart(id);
    return newPayment.save();
  }

  async update(id: string, payment: PaymentDTO) {
    const newPayment = await this.paymentModel
      .findOneAndReplace({ _id: id }, payment, { new: true })
      .populate('cart');
    if (!newPayment) {
      throw new BadRequestException('update cart failed!!');
    }
    return newPayment;
  }
}
