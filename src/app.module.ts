// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserPanelModule } from './user-panel/user-panel.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@Module({
  imports: [
    // Connect to MongoDB using Mongoose
    MongooseModule.forRoot(
      'mongodb+srv://tinahomayouni:seqUOya7477@cluster0.p3ghsix.mongodb.net/?retryWrites=true&w=majority',
    ),

    // Import the AuthModule which contains the authentication-related components
    AuthModule,
    AdminPanelModule,
    UserPanelModule,

    // Configure JWT authentication
    JwtModule.register({
      secret: 'your-secret-key', // Change this to a more secure secret
      signOptions: { expiresIn: '1h' }, // Set the expiration time for the token
    }),
  ],
})
export class AppModule {}
