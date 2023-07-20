import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login-user.dto';

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
    const user = await this.userService.getUserByEmail(loginDTO.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const verify = await bcrypt.compare(loginDTO.password, user.password);
    if (!verify) {
      throw new HttpException(
        'login or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.generateToken(user);
  }
}
