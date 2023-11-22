// src/backoffice/backoffice.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeService } from './backoffice.service';
import { BackofficeController } from './backoffice.controller';
import { UserSchema } from 'src/auth/schema/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [BackofficeController],
  providers: [BackofficeService],
})
export class BackofficeModule {}
