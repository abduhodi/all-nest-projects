import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/jwtConstants';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService, // private readonly userService: AdminService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const [bearer, token] = req.headers?.authorization?.split(' ') ?? [];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('token not provided');
    }
    let payload: any;
    try {
      payload = this.jwtService.verify(token, {
        secret: jwtConstants.accessKey,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error.message);
    }

    const admin = await this.adminService.findOne(payload?.id);
    if (admin) {
      if (admin.hashedRefreshToken) {
        req.payload = payload;
        req.isAdmin = true;

        return true;
      }
      throw new UnauthorizedException('Need login action');
    }
    throw new UnauthorizedException('payload modified!');

    // const user = await userService.findOne(payload.id);
    // if (user) {
    //   if (user.hashedRefreshToken) {
    //     req.payload = payload;
    //     req.isUser = true;

    //     return true;
    //   }
    //   throw new UnauthorizedException('Need login action');
    // }
  }
}
