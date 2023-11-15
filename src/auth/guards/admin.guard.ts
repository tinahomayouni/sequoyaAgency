// src/auth/guards/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('User in AdminGuard:', user);

    // Check if there is a user and the role is 'admin'
    const canActivate = !!user && user.role === 'admin';

    console.log('CanActivate in AdminGuard:', canActivate);

    return canActivate;
  }
}
