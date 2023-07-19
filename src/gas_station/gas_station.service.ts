import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GasStation } from './models/gas_station.model';
import { CreateGasStationDTO } from './dto/create-gas_station.dto';
import { UpdateGasStationDTO } from './dto/update-gas_station.dto';

@Injectable()
export class GasStationService {
  constructor(
    @InjectModel(GasStation)
    private readonly gasStationRepo: typeof GasStation,
  ) {}

  async createGasStation(
    createGasStationDTO: CreateGasStationDTO,
  ): Promise<GasStation> {
    return this.gasStationRepo.create(createGasStationDTO);
  }

  async getAllGasStations(): Promise<GasStation[]> {
    return this.gasStationRepo.findAll({ include: { all: true } });
  }

  async getGasStationById(id: number): Promise<GasStation> {
    return this.gasStationRepo.findByPk(id, { include: { all: true } });
  }

  async deleteGasStation(id: number): Promise<number> {
    return this.gasStationRepo.destroy({ where: { id } });
  }

  async updateGasStation(
    id: number,
    updateGasStationDTO: UpdateGasStationDTO,
  ): Promise<GasStation> {
    const updated = await this.gasStationRepo.update(updateGasStationDTO, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }
}
