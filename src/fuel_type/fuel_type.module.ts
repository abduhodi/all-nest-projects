import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FuelType } from './models/fuel_type.model';
import { FuelTypeController } from './fuel_type.controller';
import { FuelTypeService } from './fuel_type.service';

@Module({
  imports: [SequelizeModule.forFeature([FuelType])],
  controllers: [FuelTypeController],
  providers: [FuelTypeService],
})
export class FuelTypeModule {}
