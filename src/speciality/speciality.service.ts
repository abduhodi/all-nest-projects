import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Speciality } from './schemas/speciality.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectModel(Speciality.name)
    private readonly specialityModel: Model<Speciality>,
  ) {}

  create(createSpecialityDto: CreateSpecialityDto) {
    return this.specialityModel.create(createSpecialityDto);
  }

  findAll() {
    return this.specialityModel.find().populate('workers');
  }

  async findOne(id: string) {
    return this.specialityModel.findById(id).populate('workers').exec();
  }

  async update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    const updatedSpeciality = await this.specialityModel.findByIdAndUpdate(
      id,
      updateSpecialityDto,
      { new: true },
    );
    return updatedSpeciality;
  }

  async remove(id: string) {
    const removedSpeciality = await this.specialityModel.findByIdAndDelete(id);
    return removedSpeciality;
  }
}
