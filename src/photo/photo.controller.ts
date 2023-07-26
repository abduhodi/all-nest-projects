import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './models/photo.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
import { SelfGuard } from 'src/guards/self.guard';
import { Request } from 'express';

@ApiTags('Photos')
@UseGuards(JwtGuard)
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @ApiOperation({ summary: 'create new photo' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
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
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Photo> {
    return this.photoService.findOne(id);
  }

  @ApiOperation({ summary: 'update photo' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo> {
    return this.photoService.update(id, updatePhotoDto);
  }

  @ApiOperation({ summary: 'delete photo' })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.photoService.remove(id);
  }

  @ApiOperation({ summary: 'like photo' })
  @Get('like/:id')
  async likePhoto(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.photoService.likePhoto(id, req);
  }
}
