// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schema/users.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // Other modules or dependencies can be imported here
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService], // Export the UserService for use in other modules
})
export class UserModule {}
