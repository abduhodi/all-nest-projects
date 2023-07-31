import {
  Injectable,
  HttpException,
  HttpStatus,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';
import { PostService } from '../photo/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private readonly commentRepo: typeof Comment,
    private readonly userService: UsersService,
    private readonly photoService: PostService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userService.findOne(createCommentDto.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const photo = await this.photoService.findOne(createCommentDto.photoId);
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    const comment = await this.commentRepo.create(createCommentDto);
    await comment.$set('users', [user.id]);
    return comment;
  }

  findAll() {
    return this.commentRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.commentRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const updated = await this.commentRepo.update(updateCommentDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }

  async remove(id: number) {
    const deleted = await this.commentRepo.destroy({ where: { id } });
    return deleted == 1
      ? { message: 'delete success' }
      : { message: 'delete failure' };
  }

  async likeComment(id: number, req: Request) {
    const comment = await this.findOne(id);
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    // @ts-ignore
    const user: User = await this.userService.findOne(req.user.id);
    if (comment.likes.some((ur) => ur.id === user.id)) {
      await comment.$remove('likes', [user.id]);
      await user.$remove('likedComments', [comment.id]);
    } else {
      await comment.$set('likes', [user.id]);
      await user.$set('likedComments', [comment.id]);
    }

    const newComment = await this.findOne(id);
    return {
      id: newComment.id,
      text: newComment.text,
      likes: newComment.likes,
    };
  }
}
