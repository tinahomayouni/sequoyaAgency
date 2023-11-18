// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserReqDto } from './dto/user.request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userRequestDto: UserReqDto): Promise<User> {
    const { username, email, password, role } = userRequestDto;

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the specified role
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      plan: 'default',
      isPlanActive: true,
      order: 'default',
      orderDate: new Date(),
      role: role, // Use the provided role or default to 'user'
    });

    // Save the user to the database
    return await newUser.save();
  }
  async login(userReqDto: UserReqDto): Promise<{
    accessToken: string;
    role: string;
    plan: string;
    username: string;
  }> {
    const { email, password } = userReqDto;

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
    throw new Error('Invalid email or password');
  }
}
