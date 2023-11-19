// src/user-panel/user-panel-controller.ts
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserPanelService } from './user-panel.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user-panel')
export class UserPanelController {
  constructor(private readonly userPanelService: UserPanelService) {}

  @Post('dashboard')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // Use the JwtAuthGuard to ensure authentication
  async dashboard(@Request() req) {
    const userDetails = req.user; // Assuming the user information is attached by JwtAuthGuard

    // Pass the user details to the service
    return await this.userPanelService.showUserDetails(userDetails);
  }
}
