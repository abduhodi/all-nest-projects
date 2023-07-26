import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { PhotoLikeDto } from './dto/photo-like.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user.model';
// import { Request } from 'express';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo) private readonly photoRepo: typeof Photo,
    private readonly userService: UsersService,
  ) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const { users, ...newPhoto } = createPhotoDto;
    console.log(users);
    console.log(newPhoto);
    if (
      !users.every(async (user) => {
        const ur = await this.userService.findOne(user.id);
        ur ? true : false;
      })
    ) {
      throw new NotFoundException('User not found');
    }

    const photo = await this.photoRepo.create(newPhoto);
    await photo.$set('users', users);

    return photo;
  }

  async findAll(): Promise<Photo[]> {
    return this.photoRepo.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        all: true,
      },
    });
  }

  async findOne(id: number): Promise<Photo> {
    return this.photoRepo.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
    const updated = await this.photoRepo.update(updatePhotoDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    return this.photoRepo.destroy({ where: { id } });
  }

  async likePhoto(id: number, req: any) {
    const photo = await this.findOne(id);
    if (!photo) {
      throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
    }
    const user: User = req.user;
    if (photo.likes.some((us) => us.id === user.id)) {
      await photo.$remove('likes', [user.id]);
      await user.$remove('likedPhotos', [photo.id]);
    } else {
      await photo.$set('likes', [user.id]);
      await user.$set('likedPhotos', [photo.id]);
    }
    const updatedPhoto = await this.findOne(id);

    return {
      id: updatedPhoto.id,
      link: updatedPhoto.link,
      likes: updatedPhoto.likes,
    };
  }
}
