import { Module } from '@nestjs/common';
import { FarmSpecialityService } from './farm-speciality.service';
import { FarmSpecialityController } from './farm-speciality.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FarmSpeciality,
  FarmSpecialitySchema,
} from './schemas/farm-speciality.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FarmSpeciality.name, schema: FarmSpecialitySchema },
    ]),
  ],
  controllers: [FarmSpecialityController],
  providers: [FarmSpecialityService],
})
export class FarmSpecialityModule {}
