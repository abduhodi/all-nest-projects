import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { AddRoleDTO } from './dto/add-role.dto';
import { ActivateUserDTO } from './dto/activate-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    const role = await this.roleService.findRoleByName('admin');
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    // await newUser.$set('roles', [role.id]);
    // await newUser.save();
    newUser.roles = [role];

    return newUser;
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getAllUsers() {
    return await this.userRepo.findAll({ include: { all: true } });
  }

  async getUserById(id: number) {
    return await this.userRepo.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const updated = await this.userRepo.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }

  async deleteUser(id: number) {
    return this.userRepo.destroy({ where: { id } });
    // if (!user) {
    //   throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    // }
  }

  async addRole(addRoleDTO: AddRoleDTO): Promise<User> {
    const user = await this.userRepo.findByPk(addRoleDTO.userId, {});
    const role = await this.roleService.findRoleByName(addRoleDTO.value);
    if (!user || !role) {
      throw new HttpException('user or role not found', HttpStatus.NOT_FOUND);
    }
    await user.$add('roles', role.id);
    const updatedUser = await this.userRepo.findByPk(addRoleDTO.userId, {
      include: { all: true },
    });
    return updatedUser;
  }

  async removeRole(addRoleDTO: AddRoleDTO): Promise<User> {
    const user = await this.userRepo.findByPk(addRoleDTO.userId, {});
    const role = await this.roleService.findRoleByName(addRoleDTO.value);
    if (!user || !role) {
      throw new HttpException('user or role not found', HttpStatus.NOT_FOUND);
    }
    await user.$remove('roles', role.id);
    const updatedUser = await this.userRepo.findByPk(addRoleDTO.userId, {
      include: { all: true },
    });
    return updatedUser;
  }

  async activateUser(activateUserDTO: ActivateUserDTO): Promise<User> {
    const user = await this.userRepo.findByPk(activateUserDTO.userId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    user.isActive = true;
    await user.save();
    return user;
  }

  async deactivateUser(activateUserDTO: ActivateUserDTO): Promise<User> {
    const user = await this.userRepo.findByPk(activateUserDTO.userId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    user.isActive = false;
    await user.save();
    return user;
  }
}
