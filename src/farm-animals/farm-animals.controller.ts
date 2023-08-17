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
import { FarmAnimalsService } from './farm-animals.service';
import { CreateFarmAnimalDto } from './dto/create-farm-animal.dto';
import { UpdateFarmAnimalDto } from './dto/update-farm-animal.dto';
import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from '../guards/jwt.guard';

@ApiTags('Farm-Animals')
@UseGuards(JWTGuard)
@Controller('farm-animals')
export class FarmAnimalsController {
  constructor(private readonly farmAnimalsService: FarmAnimalsService) {}

  @Post()
  create(@Body() createFarmAnimalDto: CreateFarmAnimalDto) {
    return this.farmAnimalsService.create(createFarmAnimalDto);
  }

  @Get()
  findAll() {
    return this.farmAnimalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmAnimalsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFarmAnimalDto: UpdateFarmAnimalDto,
  ) {
    return this.farmAnimalsService.update(id, updateFarmAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmAnimalsService.remove(id);
  }
}
