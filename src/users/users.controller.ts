import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { SelfGuard } from '../guards/self.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'create new user' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'get all users' })
  @Get('all')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'get user by id' })
  @UseGuards(SelfGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'update user' })
  @UseGuards(SelfGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'delete user' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.usersService.remove(+id);
  }
}
