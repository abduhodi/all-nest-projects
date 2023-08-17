import { Injectable } from '@nestjs/common';
import { CreateFarmSpecialityDto } from './dto/create-farm-speciality.dto';
import { UpdateFarmSpecialityDto } from './dto/update-farm-speciality.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FarmSpeciality } from './schemas/farm-speciality.entity';
import { Model } from 'mongoose';

@Injectable()
export class FarmSpecialityService {
  constructor(
    @InjectModel(FarmSpeciality.name)
    private readonly farmSpecModel: Model<FarmSpeciality>,
  ) {}

  async create(createFarmSpecialityDto: CreateFarmSpecialityDto) {
    const createdFarmSpeciality = new this.farmSpecModel(
      createFarmSpecialityDto,
    );
    return createdFarmSpeciality.save();
  }

  async findAll() {
    return this.farmSpecModel.find().exec();
  }

  async findOne(id: string) {
    return this.farmSpecModel.findById(id).exec();
  }

  async update(id: string, updateFarmSpecialityDto: UpdateFarmSpecialityDto) {
    const updatedFarmSpeciality = await this.farmSpecModel.findByIdAndUpdate(
      id,
      updateFarmSpecialityDto,
      { new: true },
    );
    return updatedFarmSpeciality;
  }

  async remove(id: string) {
    const removedFarmSpeciality = await this.farmSpecModel.findByIdAndDelete(
      id,
    );
    return removedFarmSpeciality;
  }
}
