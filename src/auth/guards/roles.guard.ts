// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) {
      // No specific roles required, so access is granted
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log('Request Headers:', request.headers);
    console.log('Request User:', request.user);

    const user = request.user;
    console.log('User:', user);

    // Check if the user has at least one of the required roles
    return roles.some((role) => user && user.role === role);
  }
}
