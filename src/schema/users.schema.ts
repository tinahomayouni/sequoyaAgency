// schema/user.schema.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
  },
  isPlanActive: Boolean,
  order: String,
  orderDate: Date,
  role: String,
});
