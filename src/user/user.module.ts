// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from '../schema/users.schema';
import { Plan, PlanSchema } from 'src/schema/plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Plan.name, schema: PlanSchema },
    ]),
    // Other modules or dependencies can be imported here
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService], // Export the UserService for use in other modules
})
export class UserModule {}
