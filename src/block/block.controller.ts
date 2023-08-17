import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { ObjectId } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from '../guards/jwt.guard';

@ApiTags('Block')
@UseGuards(JWTGuard)
@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blockService.create(createBlockDto);
  }

  @Get()
  findAll() {
    return this.blockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.blockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blockService.update(id, updateBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.blockService.remove(id);
  }
}
