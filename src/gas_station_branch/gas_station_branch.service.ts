import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GasStationBranch } from './models/gas_station_branch.model';
import { CreateGasStationBranchDTO } from './dto/create-gas_station_branch.dto';
import { UpdateGasStationBranchDTO } from './dto/update-gas_station_branch.dto';

@Injectable()
export class GasStationBranchService {
  constructor(
    @InjectModel(GasStationBranch)
    private readonly gasStationBranchRepo: typeof GasStationBranch,
  ) {}

  async createGasStationBranch(
    createGasStationBranchDTO: CreateGasStationBranchDTO,
  ): Promise<GasStationBranch> {
    return this.gasStationBranchRepo.create(createGasStationBranchDTO);
  }

  async getAllGasStationBranchs(): Promise<GasStationBranch[]> {
    return this.gasStationBranchRepo.findAll({ include: { all: true } });
  }

  async getGasStationBranchById(id: number): Promise<GasStationBranch> {
    return this.gasStationBranchRepo.findByPk(id, { include: { all: true } });
  }

  async deleteGasStationBranch(id: number): Promise<number> {
    return this.gasStationBranchRepo.destroy({ where: { id } });
  }

  async updateGasStationBranch(
    id: number,
    updateGasStationBranchDTO: UpdateGasStationBranchDTO,
  ): Promise<GasStationBranch> {
    const updated = await this.gasStationBranchRepo.update(
      updateGasStationBranchDTO,
      { where: { id }, returning: true },
    );
    return updated[1][0].dataValues;
  }
}
