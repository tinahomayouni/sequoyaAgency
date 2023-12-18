// schema/users.schema.ts
import * as mongoose from 'mongoose';

const PlanOptionsSchema = new mongoose.Schema({
  website: Boolean,
  businessCard: Boolean,
  flyer: Boolean,
  social: Boolean,
  support: String,
});

export const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  plan: {
    type: String,
    enum: ['gold', 'silver', 'bronze'],
    default: 'bronze',
  },
  planOptions: {
    type: PlanOptionsSchema,
    default: {
      website: true,
      businessCard: false,
      flyer: false,
      social: false,
      support: '6month',
    },
  },
  isPlanActive: Boolean,
  order: String,
  orderDate: Date,
  role: String,
});
