// src/admin-panel/admin-panel.controller.ts
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';

@Controller('admin-panel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Post('dashboard')
  async privateRoute(@Request() req) {
    console.log('all user before func');

    return await this.adminPanelService.getAllUsersWithPlansAndOrderTimes();
  }
}
