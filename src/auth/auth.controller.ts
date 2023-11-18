// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserReqDto } from './dto/user.request.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userRequestDto: UserReqDto) {
    try {
      const user = await this.authService.signUp(userRequestDto);
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
  async login(@Body() userReqDto: UserReqDto) {
    try {
      const result = await this.authService.login(userReqDto);
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
