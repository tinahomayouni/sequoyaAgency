// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserReqLoginDto } from './dto/user.request.login.dto';
import { UserReqSignUpDto } from './dto/user.request.signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userRequestSignUpDto: UserReqSignUpDto) {
    try {
      const user = await this.authService.signUp(userRequestSignUpDto);
      return {
        message: 'User registered successfully',
        user,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Registration failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() userRequestLoginDto: UserReqLoginDto) {
    try {
      const result = await this.authService.login(userRequestLoginDto);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid email or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
