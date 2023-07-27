import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { userStub } from './stubs/user.stub';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../../roles/roles.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Role } from '../../roles/models/role.model';
import { CreateUserDto } from '../dto/create-user.dto';

describe('User service', () => {
  let userService: UserService;
  const mockUserRepo = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
    destroy: jest.fn().mockImplementation(() => 1 | 0),
  };
  const mockRolesRepo = {
    findOne: jest.fn().mockImplementation((name) => 'ADMIN'),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUserRepo,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRolesRepo,
        },
      ],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeEach(async () => {
        createUserDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
        };
        user = await userService.createUser(createUserDto);
        console.log(user);
      });
      it('then it should create new user', () => {
        expect(user).toMatchObject({
          ...userStub(),
          roles: ['ADMIN'],
        });
      });
    });
  });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      test('then it should call userService', async () => {
        expect(await userService.getUserById(userStub().id)).toEqual(
          userStub(),
        );
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      test('then it should call userService', async () => {
        expect(await userService.deleteUser(userStub().id)).toEqual(1 | 0);
      });
    });
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      test('then it should call userService', async () => {
        expect(await userService.getAllUsers()).toEqual([userStub()]);
      });
    });
  });
});
