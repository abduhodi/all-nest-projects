import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { VenuePhotoService } from './venue_photo.service';
import { CreateVenuePhotoDto } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('venue-photo')
export class VenuePhotoController {
  constructor(private readonly venuePhotoService: VenuePhotoService) {}

  @UseInterceptors(FileInterceptor('photo'))
  @Post('create/:id')
  async createVenuePhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.venuePhotoService.createVenuePhoto({ venueId: id, photo });
  }

  @Get()
  async findAllVenuePhoto() {
    return this.venuePhotoService.findAllVenuePhoto();
  }

  @Get(':id')
  async findOneVenuePhotoByPk(@Param('id') id: string) {
    return this.venuePhotoService.findOneVenuePhotoByPk(+id);
  }

  @Patch(':id')
  async updateVenuePhoto(
    @Param('id') id: string,
    @Body() updateVenuePhotoDto: UpdateVenuePhotoDto,
  ) {
    return this.venuePhotoService.updateVenuePhoto(+id, updateVenuePhotoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.venuePhotoService.removeVenuePhoto(+id);
  }
}
