import { Injectable } from '@nestjs/common';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { VenueType } from './models/venue_type.model';

@Injectable()
export class VenueTypeService {
  constructor(
    @InjectModel(VenueType) private readonly venueTypeRepo: typeof VenueType,
  ) {}
  async createVenueType(createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypeRepo.create(createVenueTypeDto);
  }

  findAllVenueTypes() {
    return this.venueTypeRepo.findAll({ include: { all: true } });
  }

  findOneVenueTypeByPk(id: number) {
    return this.venueTypeRepo.findByPk(id, { include: { all: true } });
  }

  async updateVenueType(id: number, updateVenueTypeDto: UpdateVenueTypeDto) {
    const updated = await this.venueTypeRepo.update(updateVenueTypeDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }

  removeVenueType(id: number) {
    return this.venueTypeRepo.destroy({ where: { id } });
  }
}
