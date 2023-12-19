// src/payment/payment.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CheckoutSessionDto } from './checkout-session.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('create-checkout-session')
  async createCheckoutSession() {
    console.log('before');
    const session = await this.paymentService.createCheckoutSession();
    console.log('after');
    return session;
  }
}
