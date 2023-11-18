// src/user-panel/user-panel.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPanelService {
  async showUserDetails(userDetails: any): Promise<any> {
    // Implement your logic to show user details
    return {
      username: userDetails.username,
      role: userDetails.role,
      plan: userDetails.plan,
      message: 'Private route accessed successfully',
    };
  }
}
