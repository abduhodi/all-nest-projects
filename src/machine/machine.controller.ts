import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDTO } from './dto/create-machine.dto';
import { Machine } from './models/machine.model';
import { UpdateMachineDTO } from './dto/update-machine.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Machine')
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @ApiOperation({ summary: 'reate new machine' })
  @Post('create')
  async createMachine(
    @Body() createMachineDTO: CreateMachineDTO,
  ): Promise<Machine> {
    return this.machineService.createMachine(createMachineDTO);
  }

  @ApiOperation({ summary: 'get all machine' })
  @Get('all')
  async getAllMachines(): Promise<Machine[]> {
    return this.machineService.getAllMachines();
  }

  @ApiOperation({ summary: 'get machine by id' })
  @Get(':id')
  async getMachineById(@Param('id') id: string): Promise<Machine> {
    return this.machineService.getMachineById(+id);
  }

  @ApiOperation({ summary: 'delete machine' })
  @Delete(':id')
  async deleteMachine(@Param('id') id: string): Promise<number> {
    return this.machineService.deleteMachine(+id);
  }

  @ApiOperation({ summary: 'update machine' })
  @Put('update/:id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDTO: UpdateMachineDTO,
  ): Promise<Machine> {
    return this.machineService.updateMachine(+id, updateMachineDTO);
  }
}
