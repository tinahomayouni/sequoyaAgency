import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/interfaces/user.interface';

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
  async getUser(
    username?: string,
    role?: string,
    plan?: string,
    orderDate?: Date,
  ) {
    try {
      // Build the filter object based on provided parameters
      const filter: any = {};
      if (username) filter.username = username;
      if (role) filter.role = role;
      if (plan) filter.plan = plan;
      if (orderDate) filter.orderDate = orderDate;

      // Retrieve users from MongoDB Atlas based on the filter
      const users = await this.userModel.find(filter, {
        username: 1,
        role: 1,
        plan: 1,
        orderDate: 1,
      });

      console.log('Filtered users:', users);

      // Your logic to process or return the filtered users as needed
      return users;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  }
}

// Get users with a specific username
//const usersByUsername = await getUser('desiredUsername');

// Get users with a specific role
//const usersByRole = await getUser(undefined, 'desiredRole');

// Get users with a specific plan
//const usersByPlan = await getUser(undefined, undefined, 'desiredPlan');

// Get users with a specific orderDate
//const usersByOrderDate = await getUser(undefined, undefined, undefined, new Date('desiredOrderDate'));
