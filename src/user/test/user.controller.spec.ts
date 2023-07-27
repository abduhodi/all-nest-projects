import { AppModule } from 'src/app.module';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { userStub } from './stubs/user.stub';

jest.mock('../user.service');
describe('User controller', () => {
  let userController: UserController;
  let userService: UserService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      // imports: [AppModule],
      controllers: [UserController],
      providers: [UserService, JwtService],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });
  it('should be defined userController', () => {
    expect(userController).toBeDefined();
  });
  it('should be defined userService', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeAll(async () => {
        createUserDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
        };
        user = await userController.createUser(createUserDto);
        console.log(user);
      });
      it('then it should call userSevice', () => {
        expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
      });
      it('then it should return User', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await userController.getUserById(userStub().id);
      });

      it('then it should call userSevice', () => {
        expect(userService.getUserById).toBeCalledWith(userStub().id);
      });
      it('then it should return User', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      let user: User[];
      beforeEach(async () => {
        user = await userController.getAllUsers();
      });

      it('then it should call userSevice', () => {
        expect(userService.getAllUsers).toBeCalled();
      });
      it('then it should return User[]', () => {
        expect(user).toEqual([userStub()]);
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let result: number;
      beforeEach(async () => {
        result = await userController.deleteUser(userStub().id);
      });

      it('then it should call userSevice', () => {
        expect(userService.deleteUser).toBeCalledWith(userStub().id);
      });
      it('then it should return 1 or 0', () => {
        expect(result).toEqual(1 | 0);
      });
    });
  });
});
