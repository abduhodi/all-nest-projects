import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
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
    return true;
  }
}
