// src/payment/schemas/plan.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlanOptions, PlanOptionsSchema } from './plan-option.schema';

@Schema()
export class Plan extends Document {
  @Prop({
    type: String,
    enum: ['gold', 'silver', 'bronze'],
    default: 'bronze',
  })
  type: string;

  @Prop({ type: PlanOptionsSchema, default: {} })
  options: PlanOptions;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
