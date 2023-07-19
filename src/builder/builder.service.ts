import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Builder } from './models/builder.model';
import { CreateBuilderDTO } from './dto/create-builder.dto';
import { UpdateBuilderDTO } from './dto/update-builder.dto';

@Injectable()
export class BuilderService {
  constructor(
    @InjectModel(Builder) private readonly builderRepo: typeof Builder,
  ) {}

  async createBuilder(createBuilderDTO: CreateBuilderDTO): Promise<Builder> {
    return this.builderRepo.create(createBuilderDTO);
  }

  async getAllBuilders(): Promise<Builder[]> {
    return this.builderRepo.findAll({ include: { all: true } });
  }

  async getBuilderById(id: number): Promise<Builder> {
    return this.builderRepo.findByPk(id, { include: { all: true } });
  }

  async deleteBuilder(id: number): Promise<number> {
    return this.builderRepo.destroy({ where: { id } });
  }

  async updateBuilder(
    id: number,
    updateBuilderDTO: UpdateBuilderDTO,
  ): Promise<Builder> {
    const builder = await this.builderRepo.update(updateBuilderDTO, {
      where: { id },
      returning: true,
    });
    return builder[1][0].dataValues;
  }
}
