import { Injectable } from '@nestjs/common';
import { CreateVenuePhotoDto, File } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';
import { join, resolve } from 'path';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { VenuePhoto } from './models/venue_photo.model';

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto) private readonly venuePhotoRepo: typeof VenuePhoto,
  ) {}
  async createVenuePhoto(createVenuePhotoDto: CreateVenuePhotoDto) {
    const fileName = this.writeFile(createVenuePhotoDto.photo);
    return this.venuePhotoRepo.create({
      venueId: createVenuePhotoDto.venueId,
      url: fileName,
    });
  }

  async findAllVenuePhoto() {
    return this.venuePhotoRepo.findAll({ include: { all: true } });
  }

  async findOneVenuePhotoByPk(id: number) {
    return this.venuePhotoRepo.findByPk(id, { include: { all: true } });
  }

  async updateVenuePhoto(id: number, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    const updated = await this.venuePhotoRepo.update(updateVenuePhotoDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }

  async removeVenuePhoto(id: number) {
    const resp = await this.venuePhotoRepo.destroy({ where: { id } });
    return resp ? { message: 'Delete success' } : { message: 'Delete failure' };
  }

  private writeFile(file: File) {
    const filePath = resolve(__dirname, '..', 'public');
    console.log(filePath);
    if (!existsSync(filePath)) {
      mkdirSync(filePath, { recursive: true });
    }
    const extension = file.mimetype.split('/')[1];
    const fileName = uuid.v4() + `.${extension}`;
    writeFileSync(join(filePath, fileName), file.buffer);
    return fileName;
  }
}
