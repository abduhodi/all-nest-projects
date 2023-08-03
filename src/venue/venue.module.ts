import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Venue } from './models/venue.model';
import { AdminModule } from '../admin/admin.module';
import { VenuePhoto } from '../venue_photo/models/venue_photo.model';
import { VenueTypeModule } from '../venue_type/venue_type.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Venue, VenuePhoto]),
    AdminModule,
    VenueTypeModule,
  ],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
