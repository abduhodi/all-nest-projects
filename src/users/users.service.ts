import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RolesService } from '../roles/roles.service';
import { File } from '../photo/dto/post.dto';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { Follow } from './models/user-follow.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    @InjectModel(Follow) private followRepo: typeof Follow,
    private readonly roleService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepo.create(createUserDto);
    const role = await this.roleService.findRoleByName('admin');
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    await newUser.$set('roles', [role.id]);
    await newUser.save();
    newUser.roles = [role];

    return newUser;
  }

  async uploadPhoto(photo: File, req: Request) {
    // @ts-ignore
    const id = req.user.id;
    const user = await this.userRepo.findByPk(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const fileName = await this.writeFile(photo);
    user.profilePhoto = fileName;
    const updated = await user.save();
    return updated;
  }

  private async writeFile(file: File): Promise<string> {
    const filePath = path.resolve(__dirname, '..', 'public');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    const extention = file.mimetype.split('/')[1];
    const fileName = uuidv4() + '.' + extention;
    fs.writeFileSync(path.join(filePath, fileName), file.buffer);
    return fileName;
  }

  async followUser(userId: number, req: Request) {
    // @ts-ignore
    const id = req.user.id;
    let response: string;
    if (id === userId) {
      throw new BadRequestException('You cannot follow yourself');
    }
    const follower = await this.userRepo.findByPk(id);
    if (!follower) {
      throw new NotFoundException('User not found');
    }

    const following = await this.userRepo.findByPk(userId);
    if (!following) {
      throw new NotFoundException('Following User not found');
    }
    const isFollowed = await this.followRepo.findOne({
      where: { userId: follower.id, followingId: following.id },
    });
    if (!isFollowed) {
      await this.followRepo.create({
        userId: follower.id,
        followingId: following.id,
      });
      response = `Now you are following to ${following.name}`;
    } else {
      await isFollowed.destroy();
      response = `you are unfollowed from ${following.name}`;
    }
    return { response };
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

  async getAllFollowings(req: Request): Promise<User[]> {
    // @ts-ignore
    const id = req.user.id;
    const followings = await this.followRepo.findAll({
      where: { userId: id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id', 'userId', 'followingId'],
      },
      include: {
        all: true,
      },
    });
    return followings.map((res) => res.following);
  }

  async getAllFollowers(req: Request): Promise<User[]> {
    // @ts-ignore
    const id = req.user.id;
    const followers = await this.followRepo.findAll({
      where: { followingId: id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id', 'userId', 'followingId'],
      },
      include: {
        all: true,
      },
    });
    return followers.map((res) => res.follower);
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
