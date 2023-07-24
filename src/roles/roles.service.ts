import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleRepo: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepo.create(createRoleDto);
  }

  async findAllRoles(): Promise<Role[]> {
    return await this.roleRepo.findAll();
  }

  async findRoleByName(name: string): Promise<Role> {
    return await this.roleRepo.findOne({ where: { name: name.toUpperCase() } });
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const updated = await this.roleRepo.update(updateRoleDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0].dataValues;
  }

  async deleteRole(id: number): Promise<number> {
    return await this.roleRepo.destroy({ where: { id } });
  }
}
