// src/auth/guards/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles || !roles.includes('admin')) {
      // If 'admin' role is not required, access is granted
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('admin:', user);

    // Allow access for users with 'admin' role
    return user && user.role === 'admin';
  }
}
