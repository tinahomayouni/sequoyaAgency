import { Document } from 'mongoose';
import { PlanOptions } from './plan-options.interface';

export interface Plan extends Document {
  type: 'gold' | 'silver' | 'bronze';
  options: PlanOptions;
}
