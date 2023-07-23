import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './models/photo.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Photos')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @ApiOperation({ summary: 'create new photo' })
  @Post()
  async create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.photoService.create(createPhotoDto);
  }

  @ApiOperation({ summary: 'get all photos' })
  @Get()
  async findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @ApiOperation({ summary: 'get photo by id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Photo[]> {
    return this.photoService.findOne(+id);
  }

  @ApiOperation({ summary: 'update photo' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo> {
    return this.photoService.update(+id, updatePhotoDto);
  }

  @ApiOperation({ summary: 'delete photo' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.photoService.remove(+id);
  }
}
