import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserComment } from '../users/models/user-comment.model';
import { UsersModule } from '../users/users.module';
import { PostLike } from './models/post-like.model';
import { UserPost } from './models/user_post.model';
import { Posts } from './models/post.model';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AssetModule } from '../assets/assets.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Posts, PostLike, UserPost, UserComment]),
    forwardRef(() => UsersModule),
    forwardRef(() => AssetModule),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
