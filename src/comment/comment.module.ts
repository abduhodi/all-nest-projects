import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { UsersModule } from 'src/users/users.module';
import { CommentLike } from './models/comment-like.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment, CommentLike]),
    forwardRef(() => UsersModule),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
