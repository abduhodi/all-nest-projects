import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './models/role.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'create new role' })
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: 'get all roles' })
  @Get()
  findAllRoles(): Promise<Role[]> {
    return this.rolesService.findAllRoles();
  }

  @ApiOperation({ summary: 'get role by id' })
  @Get(':name')
  findRoleByName(@Param('name') name: string): Promise<Role> {
    return this.rolesService.findRoleByName(name);
  }

  @ApiOperation({ summary: 'update role' })
  @Patch(':id')
  updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.updateRole(+id, updateRoleDto);
  }

  @ApiOperation({ summary: 'delete role' })
  @Delete(':id')
  deleteRole(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.rolesService.deleteRole(+id);
  }
}
