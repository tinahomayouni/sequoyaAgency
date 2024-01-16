// src/backoffice/backoffice.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeController } from './backoffice.controller';
import { User, UserSchema } from 'src/schema/users.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [BackofficeController],
})
export class BackofficeModule {}
