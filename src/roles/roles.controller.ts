import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.model';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  findAllRoles(): Promise<Role[]> {
    return this.rolesService.findAllRoles();
  }

  @Get(':name')
  findRoleByName(@Param('name') name: string): Promise<Role> {
    return this.rolesService.findRoleByName(name);
  }

  @Patch(':id')
  updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.updateRole(+id, updateRoleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string): Promise<number> {
    return this.rolesService.deleteRole(+id);
  }
}
