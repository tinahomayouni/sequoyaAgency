// schema/user.schema.ts
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  plan: {
    type: ObjectId,
    ref: 'Plan',
  },
  isPlanActive: Boolean,
  order: String,
  orderDate: Date,
  role: String,
});
