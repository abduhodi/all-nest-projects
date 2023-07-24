import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { PhotoLikeDto } from './dto/photo-like.dto';
import { UsersService } from 'src/users/users.service';

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
      include: { all: true, where: { id } },
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

  async likePhoto(photoLikeDto: PhotoLikeDto) {
    const user = await this.userService.findOne(photoLikeDto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const photo = await this.photoRepo.findByPk(photoLikeDto.photoId);
    if (!photo) {
      throw new HttpException('Photo not found', HttpStatus.NOT_FOUND);
    }

    await photo.$set('likes', [user.id]);
    await user.$set('likedPhotos', [photo.id]);

    const updatedPhoto = await this.photoRepo.findByPk(photo.id, {
      include: { all: true },
    });

    return {
      id: updatedPhoto.id,
      link: updatedPhoto.link,
      likes: updatedPhoto.likes,
    };
  }
}
