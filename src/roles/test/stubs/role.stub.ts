import { Role } from '../../models/role.model';

export const roleStub = (): Partial<Role> => {
  return {
    id: 1,
    name: 'ADMIN',
    description: 'ADMIN role',
  };
};
