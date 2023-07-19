import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MachineDriverService } from './machine_driver.service';
import { CreateMachineDriverDTO } from './dto/create-machine_driver.dto';
import { MachineDriver } from './models/machine_driver.model';
import { UpdateMachineDriverDTO } from './dto/update-machine_driver.dto';

@Controller('machine-driver')
export class MachineDriverController {
  constructor(private readonly machine_driverService: MachineDriverService) {}

  @Post('create')
  async createMachineDriver(
    @Body() createMachineDriverDTO: CreateMachineDriverDTO,
  ): Promise<MachineDriver> {
    return this.machine_driverService.createMachineDriver(
      createMachineDriverDTO,
    );
  }

  @Get('all')
  async getAllMachineDrivers(): Promise<MachineDriver[]> {
    return this.machine_driverService.getAllMachineDrivers();
  }

  @Get(':id')
  async getMachineDriverById(@Param('id') id: string): Promise<MachineDriver> {
    return this.machine_driverService.getMachineDriverById(+id);
  }

  @Delete(':id')
  async deleteMachineDriver(@Param('id') id: string): Promise<number> {
    return this.machine_driverService.deleteMachineDriver(+id);
  }

  @Put('update/:id')
  async updateMachineDriver(
    @Param('id') id: string,
    @Body() updateMachineDriverDTO: UpdateMachineDriverDTO,
  ): Promise<MachineDriver> {
    return this.machine_driverService.updateMachineDriver(
      +id,
      updateMachineDriverDTO,
    );
  }
}
