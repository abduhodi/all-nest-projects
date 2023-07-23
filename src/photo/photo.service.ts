import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';

@Injectable()
export class PhotoService {
  constructor(@InjectModel(Photo) private readonly photoRepo: typeof Photo) {}

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
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        through: { attributes: [] },
      },
    });
  }

  async findOne(id: number): Promise<Photo[]> {
    return this.photoRepo.findAll({
      include: { all: true, through: { attributes: [] }, where: { id } },
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
}
