// src/backoffice/backoffice.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';

@Injectable()
export class BackofficeService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {} //why? model and interface

  async getAllUsersWithPlansAndOrderTimes() {
    try {
      // Retrieve all users from MongoDB Atlas
      const allUsers = await this.userModel.find(
        {},
        { username: 1, role: 1, plan: 1, orderDate: 1 }, //why? {}
      );

      console.log('All users:', allUsers);

      // Your logic to process or return the users as needed
      return allUsers;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  }
}
