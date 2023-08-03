import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Request } from 'express';
import { JwtGuard } from '../guard/jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'admin login' })
  @HttpCode(HttpStatus.OK)
  @Post('admin/login')
  async adminLogin(@Body() adminLoginDto: AdminLoginDto): Promise<object> {
    return this.authService.adminLogin(adminLoginDto);
  }

  @ApiOperation({ summary: 'admin logout' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post('admin/logout')
  async adminLogout(@Req() req: Request): Promise<object> {
    return this.authService.adminLogout(req);
  }

  @ApiOperation({ summary: 'renew admin refreshToken' })
  @HttpCode(HttpStatus.OK)
  @Post('admin/refresh-token')
  async renewAdminRefreshToken(@Req() req: Request): Promise<object> {
    return this.authService.renewAdminRefreshToken(req);
  }
}
