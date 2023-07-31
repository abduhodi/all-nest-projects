import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';
import { Posts } from './models/post.model';
import { CreatePostDto, File } from './dto/post.dto';
// import { Request } from 'express';
import { AssetService } from '../assets/assets.service';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts) private readonly postRepo: typeof Posts,
    private readonly userService: UsersService,
    private readonly assetService: AssetService,
  ) {}

  private async writeFile(file: File): Promise<string> {
    const filePath = path.resolve(__dirname, '..', 'public');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    const extention = file.mimetype.split('/')[1];
    const fileName = uuid.v4() + '.' + extention;
    fs.writeFileSync(path.join(filePath, fileName), file.buffer);
    return fileName;
  }

  async create(
    createPostDto: CreatePostDto,
    req: Request,
    files: File[],
  ): Promise<Posts> {
    //@ts-ignore
    const user = await this.userService.findOne(req.user.id);
    const payload = {
      title: createPostDto.title,
      description: createPostDto.description,
    };
    const newPost = await this.postRepo.create(payload);
    const post = await this.postRepo.findByPk(newPost.id, {
      include: { all: true },
    });
    await post.$set('authors', [user.id]);

    await this.writeData(files, post);
    await post.save();

    return post;
  }

  private async writeData(files: File[], post: Posts) {
    files.forEach(async (asset) => {
      const fileName = await this.writeFile(asset);
      const newAsset = await this.assetService.createAsset({
        name: fileName,
        postId: post.dataValues.id,
      });
      post.dataValues?.assets?.push(newAsset);
    });
    return post;
  }

  async findAll(): Promise<Posts[]> {
    return this.postRepo.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        all: true,
      },
    });
  }

  async findOne(id: number): Promise<Posts> {
    return this.postRepo.findOne({
      where: { id },
      include: { all: true },
    });
  }

  // async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
  //   const updated = await this.photoRepo.update(updatePhotoDto, {
  //     where: { id },
  //     returning: true,
  //   });
  //   return updated[1][0].dataValues;
  // }

  async remove(id: number): Promise<number> {
    return this.postRepo.destroy({ where: { id } });
  }

  async likePost(id: number, req: any) {
    const post = await this.postRepo.findByPk(id, { include: { all: true } });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const user: User = await this.userService.findOne(req.user.id);
    if (post.dataValues.likes.some((us) => us.id === user.id)) {
      await post.$remove('likes', [user.dataValues.id]);
      await user.$remove('likedPosts', [post.dataValues.id]);
    } else {
      await post.$set('likes', [user.dataValues.id]);
      await user.$set('likedPosts', [post.dataValues.id]);
    }
    const updatedPost = await this.postRepo.findByPk(id, {
      include: { all: true },
    });
    console.log(updatedPost);

    return {
      id: updatedPost.id,
      main: updatedPost.main,
      likes: updatedPost.likes,
    };
  }
}
