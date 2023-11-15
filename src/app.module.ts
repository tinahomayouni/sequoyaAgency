// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Connect to MongoDB using Mongoose
    MongooseModule.forRoot(
      'mongodb+srv://tinahomayouni:seqUOya7477@cluster0.p3ghsix.mongodb.net/?retryWrites=true&w=majority',
    ),

    // Import the AuthModule which contains the authentication-related components
    AuthModule,

    // Configure JWT authentication
    JwtModule.register({
      secret: 'your-secret-key', // Change this to a more secure secret
      signOptions: { expiresIn: '1h' }, // Set the expiration time for the token
    }),
  ],
})
export class AppModule {}
