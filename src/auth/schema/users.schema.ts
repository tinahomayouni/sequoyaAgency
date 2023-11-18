// src/auth/schemas/user.schema.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  password: String,
  plan: String,
  isPlanActive: Boolean,
  order: String,
  orderDate: Date,
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});
