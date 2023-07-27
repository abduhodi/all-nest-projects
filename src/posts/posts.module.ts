import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { User } from '../user/models/user.model';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Post, User]), FilesModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
