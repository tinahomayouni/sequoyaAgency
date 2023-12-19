// src/auth/auth.service.ts
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserReqSignUpDto } from './dto/user.request.signup.dto';
import { UserReqLoginDto } from './dto/user.request.login.dto';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly paymentService: PaymentService,
  ) {}

  async signUp(userRequestSignUpDto: UserReqSignUpDto): Promise<User> {
    const { username, email, password, plan, paymentMethodId } =
      userRequestSignUpDto;

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User with this email already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Create a new user in the database
      const newUser = new this.userModel({
        username,
        email,
        password: hashedPassword,
        role: 'user',
        plan,
      });

      // Save the user to the database
      await newUser.save();

      // Create a customer in Stripe
      const customer = await this.paymentService.createCustomer(email);

      // Calculate the amount based on the selected plan
      const amount = this.calculateAmountBasedOnPlan(plan);

      // Create a payment intent
      const paymentIntent = await this.paymentService.createPaymentIntent(
        amount,
        customer,
        paymentMethodId,
      );

      // Confirm the payment intent
      const confirmedPaymentIntent =
        await this.paymentService.confirmPaymentIntent(paymentIntent.id);

      // Check if the payment is successful
      if (confirmedPaymentIntent.status === 'succeeded') {
        // Update the user's plan or any other relevant information
        newUser.plan = plan;
        newUser.isPlanActive = true;
        await newUser.save();

        return newUser;
      } else {
        // Handle failed payment
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: 'Payment failed' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Signup failed',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private calculateAmountBasedOnPlan(plan: string): number {
    // Add logic to calculate the amount based on the selected plan
    // Return the amount in cents (Stripe uses the smallest currency unit, e.g., cents for USD)
    // This is a placeholder; you need to implement this based on your plan pricing
    return 2000;
  }

  async login(userReqLoginDto: UserReqLoginDto): Promise<{
    accessToken: string;
    role: string;
    plan: string;
    username: string;
  }> {
    const { email, password } = userReqLoginDto;

    // Find the user by email
    const user = await this.userModel.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a JWT token
      const payload = {
        username: user.username,
        sub: user._id,
        role: user.role,
        plan: user.plan,
      };

      const accessToken = this.jwtService.sign(payload);

      return {
        accessToken,
        role: user.role,
        plan: user.plan,
        username: user.username,
      };
    }

    // If the user does not exist or the password is incorrect, throw an error
    throw new HttpException(
      { status: HttpStatus.UNAUTHORIZED, error: 'Invalid email or password' },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
