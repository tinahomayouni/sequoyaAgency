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
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CheckoutDto } from './checkout-session.dto';
import { UserDecorator } from './decorator/user.decorator';

@Controller('payment')
@UseGuards(JwtAuthGuard) // Use the JwtAuthGuard to ensure authentication
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() checkoutDTO: CheckoutDto,
    @UserDecorator() user: any,
  ) {
    if (!user || !user.userId) {
      // Handle the case when user information is not available
      throw new UnauthorizedException('User information not available');
    }
    const userId = user.userId;
    const session = await this.paymentService.createCheckoutSession(userId);
    return session.session['url'];
  }
  @Get('success/:userId')
  @Redirect('', 302) // Redirect to the root URL after successful payment (adjust as needed)
  async handleSuccess(@Param('userId') userId: string) {
    // Your logic for handling successful payment
    // This could include updating the order status, sending a confirmation email, etc.
    console.log(`Payment success for user: ${userId}`);
  }
  @Get('cancel/:userId')
  @Redirect('', 302) // Redirect to the root URL after payment cancellation (adjust as needed)
  async handleCancel(@Param('userId') userId: string) {
    // Your logic for handling payment cancellation
    // This could include updating the order status, showing a message to the user, etc.
    console.log(`Payment canceled for user: ${userId}`);
  }
}
