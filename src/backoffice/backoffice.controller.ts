// src/backoffice/backoffice.controller.ts
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { BackofficeService } from './backoffice.service';

@Controller('backoffice')
export class BackofficeController {
  constructor(private readonly backofficeService: BackofficeService) {}

  @Post('dashboard')
  async privateRoute(@Request() req) {
    console.log('all user before func');

    return await this.backofficeService.getAllUsersWithPlansAndOrderTimes();
  }
}
