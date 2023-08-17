import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block } from './schemas/block.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private readonly blockModel: Model<Block>,
  ) {}

  create(createBlockDto: CreateBlockDto) {
    return this.blockModel.create(createBlockDto);
  }

  findAll() {
    return this.blockModel.find();
  }

  findOne(id: ObjectId) {
    return this.blockModel.find(id);
  }

  update(id: ObjectId, updateBlockDto: UpdateBlockDto) {
    return this.blockModel.findByIdAndUpdate(id, updateBlockDto);
  }

  remove(id: ObjectId) {
    return this.blockModel.findByIdAndDelete(id);
  }
}
