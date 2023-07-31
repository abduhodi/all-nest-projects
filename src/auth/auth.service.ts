import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateLogin(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userService.findByUsername(loginUserDto.username);
    if (!user) {
      throw new UnauthorizedException('username or password is incorrect');
    }
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('username or password is incorrect');
    }
    return user;
  }

  private async generateToken(user: User): Promise<object> {
    const payload = {
      id: user.id,
      username: user.username,
      roles: [...user.roles],
    };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateLogin(loginUserDto);
    return this.generateToken(user);
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.findByUsername(createUserDto.username);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userService.create({
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 7),
    });

    return this.generateToken(newUser);
  }
}
