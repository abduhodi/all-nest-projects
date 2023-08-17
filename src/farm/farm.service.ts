import { Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Farm } from './schemas/farm.schema';

@Injectable()
export class FarmService {
  constructor(
    @InjectModel(Farm.name) private readonly farmModel: Model<Farm>,
  ) {}

  async create(createFarmDto: CreateFarmDto) {
    const createdFarm = new this.farmModel(createFarmDto);
    return createdFarm.save();
  }

  async findAll() {
    return this.farmModel.find().exec();
  }

  async findOne(id: string) {
    return this.farmModel.findById(id).exec();
  }

  async update(id: string, updateFarmDto: UpdateFarmDto) {
    const updatedFarm = await this.farmModel.findByIdAndUpdate(
      id,
      updateFarmDto,
      { new: true },
    );
    return updatedFarm;
  }

  async remove(id: string) {
    const removedFarm = await this.farmModel.findByIdAndDelete(id);
    return removedFarm;
  }
}
