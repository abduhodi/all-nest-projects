import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';

export class JWTGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const [bearer, token] = req.authorization?.split(' ') ?? [];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Bearer token is not found');
    }
    try {
      req.payload = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      throw new ForbiddenException(error.name);
    }
    const user = await this.adminService.findOne(req.payload.id);
    if (!user.hashedToken) {
      throw new UnauthorizedException('Please login');
    }
    return true;
  }
}
