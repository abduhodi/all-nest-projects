import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authorization: string = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('Authorization not found');
    }
    const bearer: string = authorization.split(' ')[0];
    const token: string = authorization.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Authorization not found2');
    }
    let user: any;
    try {
      user = this.jwtService.verify(token);
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException('Authorization failed');
    }
    req.user = user;

    const permission = user.roles.some((role: any) =>
      requiredRoles.includes(role.name),
    );
    if (!permission) {
      throw new ForbiddenException('You are not allowed');
    }

    return true;
  }
}
