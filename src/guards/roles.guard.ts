import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/models/role.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const [bearer, token] = request.headers?.authorization?.split(' ') ?? [];

    if (bearer !== 'Bearer' || token) {
      throw new UnauthorizedException();
    }

    let user: any;
    try {
      user = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    const permission = user.roles.some((role: Role) => {
      roles.includes(role.name);
    });

    if (!permission) {
      throw new ForbiddenException();
    }

    request.user = user;

    return true;
  }
}
