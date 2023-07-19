import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';
import { CreateDriverDTO } from './dto/create-driver.dto';
import { UpdateDriverDTO } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver) private readonly driverRepo: typeof Driver,
  ) {}

  async createDriver(createDriverDTO: CreateDriverDTO): Promise<Driver> {
    return this.driverRepo.create(createDriverDTO);
  }

  async getAllDrivers(): Promise<Driver[]> {
    return this.driverRepo.findAll({ include: { all: true } });
  }

  async getDriverById(id: number): Promise<Driver> {
    return this.driverRepo.findByPk(id, { include: { all: true } });
  }

  async deleteDriver(id: number): Promise<number> {
    return this.driverRepo.destroy({ where: { id } });
  }

  async updateDriver(
    id: number,
    updateDriverDTO: UpdateDriverDTO,
  ): Promise<Driver> {
    const driver = await this.driverRepo.update(updateDriverDTO, {
      where: { id },
      returning: true,
    });
    return driver[1][0].dataValues;
  }
}
