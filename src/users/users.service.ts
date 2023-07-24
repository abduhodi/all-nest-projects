import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepo.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        all: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepo.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        all: true,
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({
      where: { username },
      include: { all: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const update = await this.userRepo.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return update[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    return this.userRepo.destroy({ where: { id } });
  }
}
