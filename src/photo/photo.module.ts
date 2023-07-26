import { Module, forwardRef } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { PhotoLike } from './models/photo-like.model';
import { UsersModule } from 'src/users/users.module';
import { UserPhoto } from './models/user_photo.model';
import { UserComment } from 'src/users/models/user-comment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Photo, PhotoLike, UserPhoto, UserComment]),
    forwardRef(() => UsersModule),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
