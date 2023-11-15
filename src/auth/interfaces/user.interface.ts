// src/auth/interfaces/user.interface.ts
import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  plan: string;
  isPlanActive: boolean;
  order: string;
  orderDate: Date;
  role: 'admin' | 'user';
}
