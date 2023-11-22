// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserPanelModule } from './user-panel/user-panel.module';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [
    // Connect to MongoDB using Mongoose
    MongooseModule.forRoot(
      'mongodb+srv://tinahomayouni:seqUOya7477@cluster0.p3ghsix.mongodb.net/?retryWrites=true&w=majority',
    ),

    // Import the AuthModule which contains the authentication-related components
    AuthModule,
    BackofficeModule,
    UserPanelModule,
  ],
})
export class AppModule {}
