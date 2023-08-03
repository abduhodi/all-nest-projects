import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { InjectModel } from '@nestjs/sequelize';
import { VenueController } from './venue.controller';
import { Venue } from './models/venue.model';
import { VenueTypeService } from '../venue_type/venue_type.service';

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue) private readonly venueRepo: typeof Venue,
    private readonly venueTypeService: VenueTypeService,
  ) {}

  async createVenue(createVenueDto: CreateVenueDto): Promise<Venue> {
    createVenueDto.venueTypeId.forEach((typeId) => {
      this.venueTypeService
        .findOneVenueTypeByPk(typeId)
        .then((venueType) => {
          if (!venueType) {
            throw new NotFoundException('Venue type not found');
          }
        })
        .catch((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        });
    });
    const venue = await this.venueRepo.create(createVenueDto);
    await venue.$set('venueTypes', [...createVenueDto.venueTypeId]);

    await venue.save();
    return venue;
  }

  async findAllVenues(): Promise<Venue[]> {
    return this.venueRepo.findAll({ include: { all: true } });
  }

  async findOneVenue(id: number): Promise<Venue> {
    return this.venueRepo.findOne({ where: { id }, include: { all: true } });
  }

  async updateVenue(
    id: number,
    updateVenueDto: UpdateVenueDto,
  ): Promise<Venue> {
    const updated = await this.venueRepo.update(updateVenueDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }

  async removeVenue(id: number): Promise<object> {
    const resp = await this.venueRepo.destroy({ where: { id } });
    return resp ? { message: 'Delete success' } : { message: 'Delete failure' };
  }
}
