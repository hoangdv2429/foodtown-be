import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  NotFoundException,
  Param,
  Get,
} from '@nestjs/common';
import { Roles } from 'src/authentication/decorators/role.decorator';
import { Role } from 'src/authentication/enums/role.enum';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { CartService } from './cart.service';
import { ItemDTO } from './dto/item.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/')
  async getCurrentCart(@Request() req: RequestWithUser) {
    const userId = req.user.id;
    const cart = await this.cartService.getCart(userId);
    return cart;
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.User)
  @Post('/')
  async addItemToCart(
    @Request() req: RequestWithUser,
    @Body() itemDTO: ItemDTO,
  ) {
    const userId = req.user.id;
    const cart = await this.cartService.addItemToCart(userId, itemDTO);
    return cart;
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/')
  async removeItemFromCart(
    @Request() req: RequestWithUser,
    @Body() productId: string,
  ) {
    const userId = req.user.id;
    const cart = await this.cartService.removeItemFromCart(userId, productId);
    if (!cart) throw new NotFoundException('Item does not exist');
    return cart;
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/:id')
  async deleteCart(@Param('id') userId: string) {
    const cart = await this.cartService.deleteCart(userId);
    if (!cart) throw new NotFoundException('Cart does not exist');
    return cart;
  }
}
