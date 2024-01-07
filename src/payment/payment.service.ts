// payment/payment.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private readonly stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createCheckoutSession(userId) {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1OPCFSJaRvCHo0ksWcE6rZkP',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost/${userId}/success.html`,
      cancel_url: `http://localhost/${userId}/cancel.html`,
    });

    console.log('Stripe Session:', session);

    return {
      session,
    };
  }

  async createCustomer(email: string): Promise<Stripe.Customer> {
    try {
      return await this.stripe.customers.create({
        email,
      });
    } catch (error) {
      console.error('Error creating customer:', error.message);
      throw new Error('Customer creation failed');
    }
  }

  async createPaymentIntent(
    amount: number,
    customer: Stripe.Customer,
    paymentMethodId: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        customer: customer.id,
        payment_method: paymentMethodId,
        confirm: true,
        description: 'Signup Payment',
      });
    } catch (error) {
      console.error('Error creating payment intent:', error.message);
      throw new Error('Payment intent creation failed');
    }
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.confirm(paymentIntentId);
    } catch (error) {
      console.error('Error confirming payment intent:', error.message);
      throw new Error('Payment intent confirmation failed');
    }
  }
}
