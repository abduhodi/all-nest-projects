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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Machine-Driver')
@Controller('machine-driver')
export class MachineDriverController {
  constructor(private readonly machine_driverService: MachineDriverService) {}

  @ApiOperation({ summary: 'create new machine-driver' })
  @Post('create')
  async createMachineDriver(
    @Body() createMachineDriverDTO: CreateMachineDriverDTO,
  ): Promise<MachineDriver> {
    return this.machine_driverService.createMachineDriver(
      createMachineDriverDTO,
    );
  }

  @ApiOperation({ summary: 'get all machine-driver' })
  @Get('all')
  async getAllMachineDrivers(): Promise<MachineDriver[]> {
    return this.machine_driverService.getAllMachineDrivers();
  }

  @ApiOperation({ summary: 'get machine-driver by id' })
  @Get(':id')
  async getMachineDriverById(@Param('id') id: string): Promise<MachineDriver> {
    return this.machine_driverService.getMachineDriverById(+id);
  }

  @ApiOperation({ summary: 'delete machine-driver' })
  @Delete(':id')
  async deleteMachineDriver(@Param('id') id: string): Promise<number> {
    return this.machine_driverService.deleteMachineDriver(+id);
  }

  @ApiOperation({ summary: 'update machine-driver' })
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
