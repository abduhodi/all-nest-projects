import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateGasStationFuelTypeDTO } from './dto/create-gas_station_fuel_type.dto';
import { GasStationFuelType } from './models/gas_station_fuel_type.model';
import { UpdateGasStationFuelTypeDTO } from './dto/update-gas_station_fuel_type.dto';
import { GasStationFuelTypeService } from './gas_station_fuel_type.service';

@Controller('gas-station-fuel-type')
export class GasStationFuelTypeController {
  constructor(
    private readonly gasStationFuelTypeService: GasStationFuelTypeService,
  ) {}

  @Post('create')
  async createGasStationFuelType(
    @Body() createGasStationFuelTypeDTO: CreateGasStationFuelTypeDTO,
  ): Promise<GasStationFuelType> {
    return this.gasStationFuelTypeService.createGasStationFuelType(
      createGasStationFuelTypeDTO,
    );
  }

  @Get('all')
  async getAllGasStationFuelTypes(): Promise<GasStationFuelType[]> {
    return this.gasStationFuelTypeService.getAllGasStationFuelTypes();
  }

  @Get(':id')
  async getGasStationFuelTypeById(
    @Param('id') id: string,
  ): Promise<GasStationFuelType> {
    return this.gasStationFuelTypeService.getGasStationFuelTypeById(+id);
  }

  @Delete(':id')
  async deleteGasStationFuelType(@Param('id') id: string): Promise<number> {
    return this.gasStationFuelTypeService.deleteGasStationFuelType(+id);
  }

  @Put('update/:id')
  async updateGasStationFuelType(
    @Param('id') id: string,
    @Body() updateGasStationFuelTypeDTO: UpdateGasStationFuelTypeDTO,
  ): Promise<GasStationFuelType> {
    return this.gasStationFuelTypeService.updateGasStationFuelType(
      +id,
      updateGasStationFuelTypeDTO,
    );
  }
}
