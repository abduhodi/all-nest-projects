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
import { FarmSpecialityService } from './farm-speciality.service';
import { CreateFarmSpecialityDto } from './dto/create-farm-speciality.dto';
import { UpdateFarmSpecialityDto } from './dto/update-farm-speciality.dto';
import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from '../guards/jwt.guard';

@ApiTags('Farm-Specialty')
@UseGuards(JWTGuard)
@Controller('farm-speciality')
export class FarmSpecialityController {
  constructor(private readonly farmSpecialityService: FarmSpecialityService) {}

  @Post()
  create(@Body() createFarmSpecialityDto: CreateFarmSpecialityDto) {
    return this.farmSpecialityService.create(createFarmSpecialityDto);
  }

  @Get()
  findAll() {
    return this.farmSpecialityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmSpecialityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFarmSpecialityDto: UpdateFarmSpecialityDto,
  ) {
    return this.farmSpecialityService.update(id, updateFarmSpecialityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmSpecialityService.remove(id);
  }
}
