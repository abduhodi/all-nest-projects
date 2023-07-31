import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { CommentLike } from './models/comment-like.model';
import { UsersModule } from '../users/users.module';
import { PostModule } from '../photo/post.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment, CommentLike]),
    forwardRef(() => UsersModule),
    forwardRef(() => PostModule),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
