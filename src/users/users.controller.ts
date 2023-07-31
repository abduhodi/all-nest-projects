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
  UploadedFile,
  ParseIntPipe,
  Req,
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
import { File } from '../photo/dto/post.dto';
import { Request } from 'express';
import { Follow } from './models/user-follow.model';

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiOperation({ summary: 'create new user' })
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  // @Post('create')
  // async create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }

  @ApiOperation({ summary: 'upload profile photo' })
  @UseInterceptors(FileInterceptor('photo'))
  @Post('upload')
  async uploadPhoto(
    @UploadedFile() photo: File,
    @Req() req: Request,
  ): Promise<User> {
    return this.usersService.uploadPhoto(photo, req);
  }

  @ApiOperation({ summary: 'follow/unfollow to user' })
  @Post('follow/:id')
  async followUser(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<object> {
    return this.usersService.followUser(id, req);
  }

  @ApiOperation({ summary: 'get all users' })
  @Get('all')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'get all followers' })
  @Get('followers')
  async getAllFollowers(@Req() req: Request): Promise<User[]> {
    return this.usersService.getAllFollowers(req);
  }

  @ApiOperation({ summary: 'get all followings' })
  @Get('followings')
  async getAllFollowings(@Req() req: Request): Promise<User[]> {
    return this.usersService.getAllFollowings(req);
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
