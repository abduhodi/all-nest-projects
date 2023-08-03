import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { compare, hash, hashSync } from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminRepo: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const payload = {
      ...createAdminDto,
      hashedPassword: hashSync(createAdminDto.password, 7),
    };
    delete payload['password'];
    return this.adminRepo.create(payload);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Admin> {
    return this.adminRepo.findOne({ where: { id }, include: { all: true } });
  }

  async findByLogin(login: string): Promise<Admin> {
    return this.adminRepo.findOne({ where: { login }, include: { all: true } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const updated = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    return this.adminRepo.destroy({ where: { id } });
  }
}
