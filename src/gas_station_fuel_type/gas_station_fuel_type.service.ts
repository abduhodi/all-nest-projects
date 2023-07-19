import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GasStationFuelType } from './models/gas_station_fuel_type.model';
import { CreateGasStationFuelTypeDTO } from './dto/create-gas_station_fuel_type.dto';
import { UpdateGasStationFuelTypeDTO } from './dto/update-gas_station_fuel_type.dto';

@Injectable()
export class GasStationFuelTypeService {
  constructor(
    @InjectModel(GasStationFuelType)
    private readonly gasStationFuelTypeRepo: typeof GasStationFuelType,
  ) {}

  async createGasStationFuelType(
    createGasStationFuelTypeDTO: CreateGasStationFuelTypeDTO,
  ): Promise<GasStationFuelType> {
    return this.gasStationFuelTypeRepo.create(createGasStationFuelTypeDTO);
  }

  async getAllGasStationFuelTypes(): Promise<GasStationFuelType[]> {
    return this.gasStationFuelTypeRepo.findAll({ include: { all: true } });
  }

  async getGasStationFuelTypeById(id: number): Promise<GasStationFuelType> {
    return this.gasStationFuelTypeRepo.findByPk(id, { include: { all: true } });
  }

  async deleteGasStationFuelType(id: number): Promise<number> {
    return this.gasStationFuelTypeRepo.destroy({ where: { id } });
  }

  async updateGasStationFuelType(
    id: number,
    updateGasStationFuelTypeDTO: UpdateGasStationFuelTypeDTO,
  ): Promise<GasStationFuelType> {
    const updated = await this.gasStationFuelTypeRepo.update(
      updateGasStationFuelTypeDTO,
      {
        where: { id },
        returning: true,
      },
    );
    return updated[1][0].dataValues;
  }
}
