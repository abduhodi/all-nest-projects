import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateGasStationBranchDTO } from './dto/create-gas_station_branch.dto';
import { GasStationBranch } from './models/gas_station_branch.model';
import { UpdateGasStationBranchDTO } from './dto/update-gas_station_branch.dto';
import { GasStationBranchService } from './gas_station_branch.service';

@Controller('gas-station-branch')
export class GasStationBranchController {
  constructor(
    private readonly gasStationBranchService: GasStationBranchService,
  ) {}

  @Post('create')
  async createGasStationBranch(
    @Body()
    createGasStationBranchDTO: CreateGasStationBranchDTO,
  ): Promise<GasStationBranch> {
    return this.gasStationBranchService.createGasStationBranch(
      createGasStationBranchDTO,
    );
  }

  @Get('all')
  async getAllGasStationBranchs(): Promise<GasStationBranch[]> {
    return this.gasStationBranchService.getAllGasStationBranchs();
  }

  @Get(':id')
  async getGasStationBranchById(
    @Param('id') id: string,
  ): Promise<GasStationBranch> {
    return this.gasStationBranchService.getGasStationBranchById(+id);
  }

  @Delete(':id')
  async deleteGasStationBranch(@Param('id') id: string): Promise<number> {
    return this.gasStationBranchService.deleteGasStationBranch(+id);
  }

  @Put('update/:id')
  async updateGasStationBranch(
    @Param('id') id: string,
    @Body() updateGasStationBranchDTO: UpdateGasStationBranchDTO,
  ): Promise<GasStationBranch> {
    return this.gasStationBranchService.updateGasStationBranch(
      +id,
      updateGasStationBranchDTO,
    );
  }
}
