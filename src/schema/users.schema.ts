// src/schema/users.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Plan } from './plan.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;
@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: ObjectId, ref: Plan.name }) // Specify the type for the plan field
  plan: Plan | string;

  @Prop()
  isPlanActive: boolean;

  @Prop()
  order: string;

  @Prop()
  orderDate: Date;

  @Prop({ type: String, default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
