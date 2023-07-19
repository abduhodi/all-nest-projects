import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Machine } from './models/machine.model';
import { CreateMachineDTO } from './dto/create-machine.dto';
import { UpdateMachineDTO } from './dto/update-machine.dto';

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine) private readonly machineRepo: typeof Machine,
  ) {}

  async createMachine(createMachineDTO: CreateMachineDTO): Promise<Machine> {
    return this.machineRepo.create(createMachineDTO);
  }

  async getAllMachines(): Promise<Machine[]> {
    return this.machineRepo.findAll({ include: { all: true } });
  }

  async getMachineById(id: number): Promise<Machine> {
    return this.machineRepo.findByPk(id, { include: { all: true } });
  }

  async deleteMachine(id: number): Promise<number> {
    return this.machineRepo.destroy({ where: { id } });
  }

  async updateMachine(
    id: number,
    updateMachineDTO: UpdateMachineDTO,
  ): Promise<Machine> {
    const machine = await this.machineRepo.update(updateMachineDTO, {
      where: { id },
      returning: true,
    });
    return machine[1][0].dataValues;
  }
}
