import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDTO } from './dto/item.dto';
import { FoodsService } from 'src/foods/foods.service';
@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
    private readonly foodsService: FoodsService,
  ) {}

  async createCart(
    userId: string,
    itemDTO: ItemDTO,
    subTotalPrice: number,
    totalPrice: number,
  ): Promise<Cart> {
    const newCart = await this.cartModel.create({
      userId,
      items: [{ ...itemDTO, subTotalPrice }],
      totalPrice,
    });
    return newCart;
  }

  async getCart(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      const newCart = await this.cartModel.create({
        userId,
        items: [],
        totalPrice: 0,
      });
      return newCart;
    }
    return cart;
  }

  async deleteCart(userId: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findOneAndRemove({ userId });
    if (!deletedCart) {
      throw new NotFoundException(
        'something went wrong: Cart not found for this user',
      );
    }
    return deletedCart;
  }

  private recalculateCart(cart: CartDocument) {
    cart.totalPrice = 0;
    cart.items.forEach((item) => {
      cart.totalPrice += item.quantity * item.food.price;
    });
  }

  async addItemToCart(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { productId, quantity } = itemDTO;
    const food = await this.foodsService.findOne(productId);
    if (!food) {
      throw new GoneException('food not found');
    }
    itemDTO.food = food;

    const cart = await this.getCart(userId);
    // console.log(cart);

    const subTotalPrice = quantity * itemDTO.food.price;

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId,
      );

      if (itemIndex > -1) {
        const item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * item.food.price;

        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        return cart.save();
      } else {
        cart.items.push({ ...itemDTO, subTotalPrice });
        this.recalculateCart(cart);
        return cart.save();
      }
    } else {
      const newCart = await this.createCart(
        userId,
        itemDTO,
        subTotalPrice,
        itemDTO.food.price,
      );
      return newCart;
    }
  }

  async removeItemFromCart(userId: string, ProductId: string): Promise<any> {
    const cart = await this.getCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == ProductId,
      );

      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        return cart.save();
      }
    } else {
      throw new GoneException('not found the cart for this user');
    }
  }
}
