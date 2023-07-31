import { roleStub } from '../test/stubs/role.stub';

export const RolesService = jest.fn().mockReturnValue({
  createRole: jest.fn().mockResolvedValue(roleStub()),
  findRoleByName: jest.fn().mockResolvedValue(roleStub()),
  findAllRoles: jest.fn().mockResolvedValue([roleStub()]),
  updateRole: jest.fn().mockResolvedValue(roleStub()),
  deleteRole: jest.fn().mockResolvedValue(1 | 0),
});
