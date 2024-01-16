// src/payment/payment.controller.ts
import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
  Redirect,
  Get,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDecorator } from './decorator/user.decorator';

@ApiBearerAuth()
@Controller('payment')
@UseGuards(JwtAuthGuard) // Use the JwtAuthGuard to ensure authentication
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('create-checkout-session')
  async createCheckoutSession(
    //@Body() checkoutDTO: CheckoutDto,
    @UserDecorator() user: any,
  ) {
    if (!user || !user.userId) {
      // Handle the case when user information is not available
      throw new UnauthorizedException('User information not available');
    }
    const { userId } = user;
    const session = await this.paymentService.createCheckoutSession(userId);
    return session.session['url'];
  }
  @Get('success/:userId')
  @Redirect()
  async handleSuccess(@UserDecorator() user: any) {
    const { userId } = user;
    const userUpdateSuccess = await this.paymentService.successPayment(userId);
    console.log(`Payment success for user: ${userId}`);
    return {
      url: 'http://localhost:3000/api',
      statusCode: 302,
    };
  }

  @Get('cancel/:userId')
  @Redirect('http://localhost:3000/api', 302) // Redirect to the root URL after payment cancellation (adjust as needed)
  async handleCancel(@UserDecorator() user: any) {
    // Your logic for handling payment cancellation
    // This could include updating the order status, showing a message to the user, etc.
    const userId = user.userId;
    console.log(`Payment canceled for user: ${userId}`);
  }
}
