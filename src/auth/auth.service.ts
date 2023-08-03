import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../admin/models/admin.model';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminService } from '../admin/admin.service';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwtConstants';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async adminLogin(adminLoginDto: AdminLoginDto): Promise<object> {
    const admin = await this.adminService.findByLogin(adminLoginDto.login);
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }
    if (!compareSync(adminLoginDto.password, admin.hashedPassword)) {
      throw new UnauthorizedException('Password is incorrect');
    }
    const payload = {
      id: admin.id,
      isCreator: admin.isCreator,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: jwtConstants.accessKey,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: jwtConstants.refreshKey,
    });
    // TODO: need encode refreshToken
    admin.hashedRefreshToken = refreshToken;
    await admin.save();

    return { accessToken };
  }

  async adminLogout(req: Request): Promise<object> {
    // @ts-ignore
    const payload = req.payload;
    const admin = await this.adminService.findOne(payload.id);
    if (!admin) {
      throw new UnauthorizedException('token modified!');
    }
    // TODO: need decode admin.hashedRefreshToken
    let adminpayload: any;
    try {
      adminpayload = await this.jwtService.verifyAsync(
        admin.hashedRefreshToken,
        { secret: jwtConstants.refreshKey },
      );
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Need login');
    }

    if (adminpayload.id !== admin.id) {
      throw new ForbiddenException('token modified');
    }

    admin.hashedRefreshToken = null;
    await admin.save();
    return { message: 'logged out' };
  }

  async renewAdminRefreshToken(req: Request): Promise<object> {
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
      if (error.message !== 'jwt expired')
        throw new UnauthorizedException(error.message);
    }
    payload = this.jwtService.decode(token, { json: true });

    // @ts-ignore
    const admin = await this.adminService.findOne(payload?.id);

    if (!admin) {
      throw new UnauthorizedException('token modified!');
    }
    // TODO: need decode admin.hashedRefreshToken
    let adminpayload: any;
    try {
      adminpayload = await this.jwtService.verifyAsync(
        admin.hashedRefreshToken,
        { secret: jwtConstants.refreshKey },
      );
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Need login');
    }

    if (adminpayload.id !== admin.id) {
      throw new ForbiddenException('token modified');
    }

    const load = {
      id: admin.id,
      isCreator: admin.isCreator,
    };
    const accessToken = await this.jwtService.signAsync(load, {
      expiresIn: '15m',
      secret: jwtConstants.accessKey,
    });
    const refreshToken = await this.jwtService.signAsync(load, {
      expiresIn: '1d',
      secret: jwtConstants.refreshKey,
    });
    // TODO: need encode refreshToken
    admin.hashedRefreshToken = refreshToken;
    await admin.save();
    return { accessToken };
  }
}
