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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { JwtGuard } from '../guard/jwt.guard';
import { CreatorGuard } from '../guard/creator.guard';
import { AdminGuard } from '../guard/admin.guard';
import { SelfGuard } from '../guard/self.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('admin')
@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'create new admin' })
  @UseGuards(CreatorGuard)
  @Post('create')
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'get all admins' })
  @UseGuards(CreatorGuard)
  @Get('all')
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'get one admin by id' })
  @UseGuards(SelfGuard, AdminGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: 'update admin' })
  @UseGuards(SelfGuard, AdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: 'delete admin' })
  @UseGuards(CreatorGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.adminService.remove(id);
  }
}
