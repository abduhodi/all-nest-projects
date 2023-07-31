import { Test } from '@nestjs/testing';
import { RolesController } from '../roles.controller';
import { RolesService } from '../roles.service';
import { Role } from '../models/role.model';
import { CreateRoleDto } from '../dto/create-role.dto';
import { roleStub } from './stubs/role.stub';

jest.mock('../roles.service');
describe('Role controller', () => {
  let rolesController: RolesController;
  let rolesService: RolesService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService],
    }).compile();
    rolesController = moduleRef.get<RolesController>(RolesController);
    rolesService = moduleRef.get<RolesService>(RolesService);
    jest.clearAllMocks();
  });
  it('should be defined rolesController', () => {
    expect(rolesController).toBeDefined();
  });
  it('should be defined rolesService', () => {
    expect(rolesService).toBeDefined();
  });

  describe('createRole', () => {
    describe('when createRole is called', () => {
      let role: Role;
      let createRoleDto: CreateRoleDto;
      beforeAll(async () => {
        createRoleDto = {
          name: roleStub().name,
          description: roleStub().description,
        };
        role = await rolesController.createRole(createRoleDto);
      });
      it('then it should call rolesSevice', () => {
        expect(rolesService.createRole).toHaveBeenCalledWith(createRoleDto);
      });
      it('then it should return Role', () => {
        expect(role).toEqual(roleStub());
      });
    });
  });

  describe('findRoleByName', () => {
    describe('when findRoleByName is called', () => {
      let role: Role;
      beforeEach(async () => {
        role = await rolesController.findRoleByName(roleStub().name);
      });

      it('then it should call rolesSevice', () => {
        expect(rolesService.findRoleByName).toBeCalledWith(roleStub().name);
      });
      it('then it should return Role', () => {
        expect(role).toEqual(roleStub());
      });
    });
  });

  describe('getAllfindAllRolesUsers', () => {
    describe('when findAllRoles is called', () => {
      let role: Role[];
      beforeEach(async () => {
        role = await rolesController.findAllRoles();
      });

      it('then it should call rolesSevice', () => {
        expect(rolesService.findAllRoles).toBeCalled();
      });
      it('then it should return Role[]', () => {
        expect(role).toEqual([roleStub()]);
      });
    });
  });

  describe('deleteRole', () => {
    describe('when deleteRole is called', () => {
      let result: number;
      beforeEach(async () => {
        result = await rolesController.deleteRole(roleStub().id);
      });

      it('then it should call rolesSevice', () => {
        expect(rolesService.deleteRole).toBeCalledWith(roleStub().id);
      });
      it('then it should return 1 or 0', () => {
        expect(result).toEqual(1 | 0);
      });
    });
  });
});
