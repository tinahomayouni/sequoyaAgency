// src/auth/interfaces/user.interface.ts
import { Document } from 'mongoose';

interface PlanOptions {
  website: boolean;
  businessCard: boolean;
  flyer: boolean;
  social: boolean;
  support: string;
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  plan: string;
  planOptions: PlanOptions;
  isPlanActive: boolean;
  order: string;
  orderDate: Date;
  role: 'admin' | 'user';
}
