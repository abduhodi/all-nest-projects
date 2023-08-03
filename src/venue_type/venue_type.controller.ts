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
} from '@nestjs/common';
import { VenueTypeService } from './venue_type.service';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guard/jwt.guard';

@ApiTags('Venue-Type')
@UseGuards(JwtGuard)
@Controller('venue-type')
export class VenueTypeController {
  constructor(private readonly venueTypeService: VenueTypeService) {}

  @Post('create')
  createVenueType(@Body() createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypeService.createVenueType(createVenueTypeDto);
  }

  @Get()
  findAllVenueTypes() {
    return this.venueTypeService.findAllVenueTypes();
  }

  @Get(':id')
  findOneVenueTypeByPk(@Param('id', ParseIntPipe) id: number) {
    return this.venueTypeService.findOneVenueTypeByPk(id);
  }

  @Patch(':id')
  updateVenueType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVenueTypeDto: UpdateVenueTypeDto,
  ) {
    return this.venueTypeService.updateVenueType(id, updateVenueTypeDto);
  }

  @Delete(':id')
  removeVenueType(@Param('id', ParseIntPipe) id: number) {
    return this.venueTypeService.removeVenueType(id);
  }
}
