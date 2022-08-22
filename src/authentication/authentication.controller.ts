import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';

import { Param } from '@nestjs/common';
import { Roles } from './decorators/role.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';

@Controller('authentication')
// @UseInterceptors(MongooseClassSerializerInterceptor(User)) temperaly disable this one
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('all')
  findAll() {
    const users = this.authenticationService.getAllUser();
    return users;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user._id);
    request.res?.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res?.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
      // `Authentication=; HttpOnly; Path=/; Max-Age=0`,
    );
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.User)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    const user = this.authenticationService.getUserByEmail(email);
    return user;
  }
}
