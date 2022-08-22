import { Cart } from 'src/cart/schemas/cart.schema';
import { Status } from '../enums/status.enum';

export class PaymentDTO {
  cart: Cart;
  status: Status;
}
