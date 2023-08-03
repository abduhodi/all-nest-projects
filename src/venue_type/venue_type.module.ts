import { Module } from '@nestjs/common';
import { VenueTypeService } from './venue_type.service';
import { VenueTypeController } from './venue_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VenueType } from './models/venue_type.model';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [SequelizeModule.forFeature([VenueType]), AdminModule],
  controllers: [VenueTypeController],
  providers: [VenueTypeService],
  exports: [VenueTypeService],
})
export class VenueTypeModule {}
