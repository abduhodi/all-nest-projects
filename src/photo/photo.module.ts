import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { UserPhoto } from './models/user_photo.model';

@Module({
  imports: [SequelizeModule.forFeature([Photo, UserPhoto])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
