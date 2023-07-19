import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDTO } from './dto/create-driver.dto';
import { Driver } from './models/driver.model';
import { UpdateDriverDTO } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('create')
  async createDriver(
    @Body() createDriverDTO: CreateDriverDTO,
  ): Promise<Driver> {
    return this.driverService.createDriver(createDriverDTO);
  }

  @Get('all')
  async getAllDrivers(): Promise<Driver[]> {
    return this.driverService.getAllDrivers();
  }

  @Get(':id')
  async getDriverById(@Param('id') id: string): Promise<Driver> {
    return this.driverService.getDriverById(+id);
  }

  @Delete(':id')
  async deleteDriver(@Param('id') id: string): Promise<number> {
    return this.driverService.deleteDriver(+id);
  }

  @Put('update/:id')
  async updateDriver(
    @Param('id') id: string,
    @Body() updateDriverDTO: UpdateDriverDTO,
  ): Promise<Driver> {
    return this.driverService.updateDriver(+id, updateDriverDTO);
  }
}
