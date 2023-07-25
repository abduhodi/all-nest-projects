import { Module, forwardRef } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { PhotoLike } from './models/photo-like.model';
import { UsersModule } from 'src/users/users.module';
import { UserPhoto } from './models/user_photo.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Photo, PhotoLike, UserPhoto]),
    forwardRef(() => UsersModule),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
