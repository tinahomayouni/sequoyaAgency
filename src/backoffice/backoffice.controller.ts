// src/backoffice/backoffice.controller.ts
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { BackofficeService } from './backoffice.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorator/user-roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@Controller('backoffice')
export class BackofficeController {
  constructor(private readonly userService: UserService) {}

  @Post('dashboard')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async privateRoute(@Request() req) {
    return await this.userService.getAllUser();
  }
}
