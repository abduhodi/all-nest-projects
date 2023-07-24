import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { CommentLikeDto } from './dto/comment-like.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private readonly commentRepo: typeof Comment,
    private readonly userService: UsersService,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepo.create(createCommentDto);
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

  remove(id: number) {
    return this.commentRepo.destroy({ where: { id } });
  }

  async likeComment(commentLikeDto: CommentLikeDto) {
    const comment = await this.commentRepo.findByPk(commentLikeDto.commentId);
    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findOne(commentLikeDto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await comment.$set('likes', [user.id]);
    await user.$set('likedComments', [comment.id]);

    const newComment = await this.commentRepo.findByPk(comment.id, {
      include: { all: true },
    });
    return {
      id: newComment.id,
      text: newComment.text,
      likes: newComment.likes,
    };
  }
}
