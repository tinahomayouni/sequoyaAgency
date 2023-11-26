// src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
  sub: string;
  username: string;
  role?: string; // Make sure 'role' is optional
  plan?: string; // Make sure 'plan' is optional
}
