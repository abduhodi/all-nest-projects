import { Injectable } from '@nestjs/common';
import { CreateFarmAnimalDto } from './dto/create-farm-animal.dto';
import { UpdateFarmAnimalDto } from './dto/update-farm-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FarmAnimal } from './schemas/farm-animal.entity';
import { Model } from 'mongoose';

@Injectable()
export class FarmAnimalsService {
  constructor(
    @InjectModel(FarmAnimal.name)
    private readonly farmAnimalModel: Model<FarmAnimal>,
  ) {}

  async create(createFarmAnimalDto: CreateFarmAnimalDto) {
    const createdFarmAnimal = new this.farmAnimalModel(createFarmAnimalDto);
    return createdFarmAnimal.save();
  }

  async findAll() {
    return this.farmAnimalModel.find().exec();
  }

  async findOne(id: string) {
    return this.farmAnimalModel.findById(id).exec();
  }

  async update(id: string, updateFarmAnimalDto: UpdateFarmAnimalDto) {
    const updatedFarmAnimal = await this.farmAnimalModel.findByIdAndUpdate(
      id,
      updateFarmAnimalDto,
      { new: true },
    );
    return updatedFarmAnimal;
  }

  async remove(id: string) {
    const removedFarmAnimal = await this.farmAnimalModel.findByIdAndDelete(id);
    return removedFarmAnimal;
  }
}
