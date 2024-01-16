import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/users.schema';

Injectable();
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async getAllUser() {
    try {
      // Retrieve all users from MongoDB Atlas
      const allUsers = await this.userModel.find(
        {},
        { username: 1, role: 1, plan: 1, orderDate: 1 },
      );

      console.log('All users:', allUsers);

      // Your logic to process or return the users as needed
      return allUsers;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  }
  async findById(userId: string) {
    try {
      const user = await this.userModel.findById(userId, {
        username: 1,
        role: 1,
        plan: 1,
        orderDate: 1,
      });

      console.log('User by ID:', user);

      // Your logic to process or return the user as needed
      return user;
    } catch (error) {
      console.error('Error retrieving user by ID:', error);
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userModel.findOne(
        { email },
        {
          username: 1,
          role: 1,
          plan: 1,
          orderDate: 1,
        },
      );

      console.log('User by email:', user);

      // Your logic to process or return the user as needed
      return user;
    } catch (error) {
      console.error('Error retrieving user by email:', error);
      throw error;
    }
  }
  async createUser(username, email, hashedPassword): Promise<User> {
    return await this.userModel.create({ email, username, hashedPassword });
  }
}
