import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MachineDriver } from './models/machine_driver.model';
import { CreateMachineDriverDTO } from './dto/create-machine_driver.dto';
import { UpdateMachineDriverDTO } from './dto/update-machine_driver.dto';

@Injectable()
export class MachineDriverService {
  constructor(
    @InjectModel(MachineDriver)
    private machine_driverRepo: typeof MachineDriver,
  ) {}

  async createMachineDriver(
    createMachineDriver: CreateMachineDriverDTO,
  ): Promise<MachineDriver> {
    return this.machine_driverRepo.create(createMachineDriver);
  }

  async getAllMachineDrivers(): Promise<MachineDriver[]> {
    return this.machine_driverRepo.findAll({ include: { all: true } });
  }

  async getMachineDriverById(id: number): Promise<MachineDriver> {
    return this.machine_driverRepo.findByPk(id, { include: { all: true } });
  }

  async deleteMachineDriver(id: number): Promise<number> {
    return this.machine_driverRepo.destroy({ where: { id } });
  }

  async updateMachineDriver(
    id: number,
    updateMachineDriverDTO: UpdateMachineDriverDTO,
  ): Promise<MachineDriver> {
    const updated = await this.machine_driverRepo.update(
      updateMachineDriverDTO,
      {
        where: { id },
        returning: true,
      },
    );
    return updated[1][0].dataValues;
  }
}
