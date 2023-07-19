import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BuilderService } from './builder.service';
import { CreateBuilderDTO } from './dto/create-builder.dto';
import { Builder } from './models/builder.model';
import { UpdateBuilderDTO } from './dto/update-builder.dto';

@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @Post('create')
  async createBuilder(
    @Body() createBuilderDTO: CreateBuilderDTO,
  ): Promise<Builder> {
    return this.builderService.createBuilder(createBuilderDTO);
  }

  @Get('all')
  async getAllBuilders(): Promise<Builder[]> {
    return this.builderService.getAllBuilders();
  }

  @Get(':id')
  async getBuilderById(@Param('id') id: string): Promise<Builder> {
    return this.builderService.getBuilderById(+id);
  }

  @Delete(':id')
  async deleteBuilder(@Param('id') id: string): Promise<number> {
    return this.builderService.deleteBuilder(+id);
  }

  @Put('update/:id')
  async updateBuilder(
    @Param('id') id: string,
    @Body() updateBuilderDTO: UpdateBuilderDTO,
  ): Promise<Builder> {
    return this.builderService.updateBuilder(+id, updateBuilderDTO);
  }
}
