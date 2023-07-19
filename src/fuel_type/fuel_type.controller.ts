import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateFuelTypeDTO } from './dto/create-fuel_type.dto';
import { FuelType } from './models/fuel_type.model';
import { UpdateFuelTypeDTO } from './dto/update-fuel_type.dto';
import { FuelTypeService } from './fuel_type.service';

@Controller('fuel-type')
export class FuelTypeController {
  constructor(private readonly fuelTypeService: FuelTypeService) {}

  @Post('create')
  async createFuelType(
    @Body() createFuelTypeDTO: CreateFuelTypeDTO,
  ): Promise<FuelType> {
    return this.fuelTypeService.createFuelType(createFuelTypeDTO);
  }

  @Get('all')
  async getAllFuelTypes(): Promise<FuelType[]> {
    return this.fuelTypeService.getAllFuelTypes();
  }

  @Get(':id')
  async getFuelTypeById(@Param('id') id: string): Promise<FuelType> {
    return this.fuelTypeService.getFuelTypeById(+id);
  }

  @Delete(':id')
  async deleteFuelType(@Param('id') id: string): Promise<number> {
    return this.fuelTypeService.deleteFuelType(+id);
  }

  @Put('update/:id')
  async updateFuelType(
    @Param('id') id: string,
    @Body()
    updateFuelTypeDTO: UpdateFuelTypeDTO,
  ): Promise<FuelType> {
    return this.fuelTypeService.updateFuelType(+id, updateFuelTypeDTO);
  }
}
