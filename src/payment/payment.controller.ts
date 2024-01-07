// src/payment/payment.controller.ts
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('create-checkout-session')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // Use the JwtAuthGuard to ensure authentication
  async createCheckoutSession(@Request() req) {
    if (!req.user.userId || !req.user.userId) {
      // Handle the case when user information is not available
      throw new UnauthorizedException('User information not available');
    }
    const userId = req.user.userId;
    const session = await this.paymentService.createCheckoutSession(userId);
    return session.session['url'];
  }
}
