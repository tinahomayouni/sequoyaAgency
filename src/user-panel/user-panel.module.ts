// src/user-admin/user-admin.module.ts
import { Module } from '@nestjs/common';
import { UserPanelController } from './user-panel.controller';
import { UserPanelService } from './user-panel.service';

@Module({
  controllers: [UserPanelController],
  providers: [UserPanelService],
})
export class UserPanelModule {}
