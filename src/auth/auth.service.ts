// src/auth/auth.service.ts
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserReqSignUpDto } from './dto/user.request.signup.dto';
import { UserReqLoginDto } from './dto/user.request.login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userRequestSignUpDto: UserReqSignUpDto): Promise<User> {
    const { username, email, password } = userRequestSignUpDto;

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
      });
      // Save the user to the database
      await newUser.save();
      return newUser;
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
