import { Schema, model } from 'mongoose';
import { PlanOptions } from '../payment/schema/plan-options.interface';
import { Plan } from '../payment/schema/plan.interfaces';

const PlanOptionsSchema = new Schema<PlanOptions>({
  website: Boolean,
  businessCard: Boolean,
  flyer: Boolean,
  social: Boolean,
  support: String,
});

export const PlanSchema = new Schema<Plan>({
  type: {
    type: String,
    enum: ['gold', 'silver', 'bronze'],
    default: 'bronze',
  },
  options: {
    type: PlanOptionsSchema,
    default: {
      website: true,
      businessCard: false,
      flyer: false,
      social: false,
      support: '6month',
    },
  },
});
