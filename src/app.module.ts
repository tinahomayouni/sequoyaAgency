// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserPanelModule } from './user-panel/user-panel.module';
import { BackofficeModule } from './backoffice/backoffice.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    //Import database (mongo)
    DatabaseModule,
    // Import the AuthModule which contains the authentication-related components
    AuthModule,
    BackofficeModule,
    UserPanelModule,
  ],
})
export class AppModule {}
