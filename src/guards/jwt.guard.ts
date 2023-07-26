import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const [bearer, token] = req.headers?.authorization?.split(' ') ?? [];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token not provided');
    }
    const user: object | null = await new Promise((resolve) => {
      try {
        const user = this.jwtService.verify(token);
        resolve(user);
      } catch (error) {
        console.log(error);
        resolve(null);
      }
    });
    if (!user) {
      throw new ForbiddenException();
    }

    req.user = user;

    return true;
  }
}
