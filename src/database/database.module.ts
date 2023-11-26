// database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

// Specify the path to the .env file
//const envPath = process.env.NODE_ENV === 'production' ? '.env' : '.env-local';

// Load the configuration from the specified file
dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL)],
})
export class DatabaseModule {}
