import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ObjectId } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { JWTGuard } from '../guards/jwt.guard';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('signup')
  signup(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.signup(createAdminDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.adminsService.login(loginDto, res);
  }

  @Get('activate/:link')
  activate(@Param('link') link: string, @Res() res: Response) {
    return this.adminsService.activate(link, res);
  }

  @UseGuards(JWTGuard)
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.adminsService.findOne(id);
  }

  @UseGuards(JWTGuard)
  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.adminsService.remove(id);
  }
}
