// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserPanelModule } from './user-panel/user-panel.module';
import { BackofficeModule } from './backoffice/backoffice.module';
import { DatabaseModule } from './database/database.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    // Import the DatabaseModule for MongoDB connection
    DatabaseModule,

    // Import the AuthModule which contains the authentication-related components
    AuthModule,

    // Import the PaymentModule to use the PaymentService
    PaymentModule,

    // Import the other modules as needed
    BackofficeModule,
    UserPanelModule,
  ],
})
export class AppModule {}
