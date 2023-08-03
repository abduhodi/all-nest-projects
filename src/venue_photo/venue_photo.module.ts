import { Module } from '@nestjs/common';
import { VenuePhotoService } from './venue_photo.service';
import { VenuePhotoController } from './venue_photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VenuePhoto } from './models/venue_photo.model';
import { Venue } from '../venue/models/venue.model';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [SequelizeModule.forFeature([VenuePhoto, Venue]), AdminModule],
  controllers: [VenuePhotoController],
  providers: [VenuePhotoService],
})
export class VenuePhotoModule {}
