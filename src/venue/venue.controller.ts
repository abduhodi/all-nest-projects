import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guard/jwt.guard';
import { Venue } from './models/venue.model';
import { AdminGuard } from '../guard/admin.guard';

@ApiTags('venue')
@UseGuards(JwtGuard)
// @UseGuards(AdminGuard)
@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @ApiOperation({ summary: 'create new venue' })
  @UseGuards(AdminGuard)
  @Post('create')
  async createVenue(@Body() createVenueDto: CreateVenueDto): Promise<Venue> {
    return this.venueService.createVenue(createVenueDto);
  }

  @ApiOperation({ summary: 'find all venues' })
  @Get('all')
  async findAllVenues(): Promise<Venue[]> {
    return this.venueService.findAllVenues();
  }

  @ApiOperation({ summary: 'find one venue' })
  @Get(':id')
  async findOneVenue(@Param('id', ParseIntPipe) id: number): Promise<Venue> {
    return this.venueService.findOneVenue(id);
  }

  @ApiOperation({ summary: 'update venue' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateVenue(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVenueDto: UpdateVenueDto,
  ): Promise<Venue> {
    return this.venueService.updateVenue(id, updateVenueDto);
  }

  @ApiOperation({ summary: 'delete venue' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async removeVenue(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.venueService.removeVenue(id);
  }
}
