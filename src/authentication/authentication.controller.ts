import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { User } from '../users/user.schema';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';

import { Param } from '@nestjs/common';

@Controller('authentication')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  //need refactor after adding role to user
  @Get('all')
  findAll() {
    const users = this.authenticationService.getAllUser();
    return users;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    // console.log('save  this one =>>>>>', registrationData);
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
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  //need refactor after adding role to user
  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    const user = this.authenticationService.getUserByEmail(email);
    return user;
  }
}
