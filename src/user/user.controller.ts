import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { AddRoleDTO } from './dto/add-role.dto';
import { ActivateUserDTO } from './dto/activate-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create new user' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'add new role to user' })
  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add-role')
  async addRole(@Body() addRoleDTO: AddRoleDTO) {
    return this.userService.addRole(addRoleDTO);
  }

  @ApiOperation({ summary: 'remove role from user' })
  @HttpCode(200)
  @Post('remove-role')
  async removeRole(@Body() addRoleDTO: AddRoleDTO) {
    return this.userService.removeRole(addRoleDTO);
  }

  @ApiOperation({ summary: 'activate user' })
  @HttpCode(200)
  @Post('activate')
  async activateUser(@Body() activateUserDTO: ActivateUserDTO): Promise<User> {
    return this.userService.activateUser(activateUserDTO);
  }

  @ApiOperation({ summary: 'deactivate user' })
  @HttpCode(200)
  @Post('deactivate')
  async deactivateUser(
    @Body() activateUserDTO: ActivateUserDTO,
  ): Promise<User> {
    return this.userService.deactivateUser(activateUserDTO);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, description: 'List of Users', type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'get user by id' })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'update user' })
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'delete user' })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
