import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Worker } from './schemas/worker.schema';
import { Model } from 'mongoose';
import { Speciality } from '../speciality/schemas/speciality.schema';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name)
    private readonly workerModel: Model<Worker>,
    @InjectModel(Speciality.name)
    private readonly specialityModel: Model<Speciality>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const spec = await this.specialityModel.findById(
      createWorkerDto.speciality,
    );
    if (!spec) {
      throw new BadRequestException('Speciality is not found');
    }
    const worker = await this.workerModel.create(createWorkerDto);
    spec.workers.push(worker);
    await spec.save();
    return worker;
  }

  findAll() {
    return this.workerModel.find().populate('speciality');
  }

  findOne(id: string) {
    return this.workerModel.findById(id);
  }

  update(id: string, updateWorkerDto: UpdateWorkerDto) {
    return this.workerModel.updateOne({ _id: id }, updateWorkerDto);
  }

  remove(id: string) {
    return this.workerModel.deleteOne({ _id: id });
  }
}
