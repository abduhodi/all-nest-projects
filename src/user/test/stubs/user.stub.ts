import { User } from '../../models/user.model';

export const userStub = (): Partial<User> => {
  return {
    id: 1,
    name: 'user1',
    email: 'user@mail.ru',
    password: 'userPassWord',
    isActive: true,
  };
};
