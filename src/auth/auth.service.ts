import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const newUser = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(newUser);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.validateUser(loginDTO);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user);
  }

  private async validateUser(loginDTO: LoginDTO) {
    const user = await this.userService.getUserByEmail(loginDTO.email);
    if (!user) {
      throw new UnauthorizedException('email or password is incorrect');
    }
    const validPassword = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException('email or password is incorrect');
    }
    return user;
  }
}
