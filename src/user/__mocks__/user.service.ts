import { userStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(userStub()),
  getUserByEmail: jest.fn().mockResolvedValue(userStub()),
  getAllUsers: jest.fn().mockResolvedValue([userStub()]),
  getUserById: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  deleteUser: jest.fn().mockResolvedValue(1 | 0),
});
