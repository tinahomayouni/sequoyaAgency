// src/payment/schemas/plan-options.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PlanOptions extends Document {
  @Prop()
  website: boolean;

  @Prop()
  businessCard: boolean;

  @Prop()
  flyer: boolean;

  @Prop()
  social: boolean;

  @Prop()
  support: string;
}

export const PlanOptionsSchema = SchemaFactory.createForClass(PlanOptions);
