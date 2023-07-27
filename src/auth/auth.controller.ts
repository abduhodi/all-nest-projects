import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'register new user' })
  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @ApiOperation({ summary: 'login user' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
