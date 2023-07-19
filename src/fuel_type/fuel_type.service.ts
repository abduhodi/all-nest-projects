import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FuelType } from './models/fuel_type.model';
import { CreateFuelTypeDTO } from './dto/create-fuel_type.dto';
import { UpdateFuelTypeDTO } from './dto/update-fuel_type.dto';

@Injectable()
export class FuelTypeService {
  constructor(
    @InjectModel(FuelType) private readonly fuelTypeRepo: typeof FuelType,
  ) {}

  async createFuelType(
    createFuelTypeDTO: CreateFuelTypeDTO,
  ): Promise<FuelType> {
    return this.fuelTypeRepo.create(createFuelTypeDTO);
  }

  async getAllFuelTypes(): Promise<FuelType[]> {
    return this.fuelTypeRepo.findAll({ include: { all: true } });
  }

  async getFuelTypeById(id: number): Promise<FuelType> {
    return this.fuelTypeRepo.findByPk(id, { include: { all: true } });
  }

  async deleteFuelType(id: number): Promise<number> {
    return this.fuelTypeRepo.destroy({ where: { id } });
  }

  async updateFuelType(
    id: number,
    updateFuelTypeDTO: UpdateFuelTypeDTO,
  ): Promise<FuelType> {
    const updated = await this.fuelTypeRepo.update(updateFuelTypeDTO, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }
}
