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

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('create')
  async createMachine(
    @Body() createMachineDTO: CreateMachineDTO,
  ): Promise<Machine> {
    return this.machineService.createMachine(createMachineDTO);
  }

  @Get('all')
  async getAllMachines(): Promise<Machine[]> {
    return this.machineService.getAllMachines();
  }

  @Get(':id')
  async getMachineById(@Param('id') id: string): Promise<Machine> {
    return this.machineService.getMachineById(+id);
  }

  @Delete(':id')
  async deleteMachine(@Param('id') id: string): Promise<number> {
    return this.machineService.deleteMachine(+id);
  }

  @Put('update/:id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDTO: UpdateMachineDTO,
  ): Promise<Machine> {
    return this.machineService.updateMachine(+id, updateMachineDTO);
  }
}
