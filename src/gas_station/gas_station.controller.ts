import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { GasStationService } from './gas_station.service';
import { CreateGasStationDTO } from './dto/create-gas_station.dto';
import { GasStation } from './models/gas_station.model';
import { UpdateGasStationDTO } from './dto/update-gas_station.dto';

@Controller('gas-station')
export class GasStationController {
  constructor(private readonly gasStationService: GasStationService) {}

  @Post('create')
  async createGasStation(
    @Body()
    createGasStationDTO: CreateGasStationDTO,
  ): Promise<GasStation> {
    return this.gasStationService.createGasStation(createGasStationDTO);
  }

  @Get('all')
  async getAllGasStations(): Promise<GasStation[]> {
    return this.gasStationService.getAllGasStations();
  }

  @Get(':id')
  async getGasStationById(@Param('id') id: string): Promise<GasStation> {
    return this.gasStationService.getGasStationById(+id);
  }

  @Delete(':id')
  async deleteGasStation(@Param('id') id: string): Promise<number> {
    return this.gasStationService.deleteGasStation(+id);
  }

  @Put('update/:id')
  async updateGasStation(
    @Param('id') id: string,
    @Body() updateGasStationDTO: UpdateGasStationDTO,
  ): Promise<GasStation> {
    return this.gasStationService.updateGasStation(+id, updateGasStationDTO);
  }
}
