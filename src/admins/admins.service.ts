import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async signup(createAdminDto: CreateAdminDto) {
    const user = await this.adminModel.findOne({
      email: createAdminDto.email,
    });
    if (user) {
      throw new BadRequestException('user is already exists');
    }
    if (createAdminDto.password !== createAdminDto.confirmPassword) {
      throw new BadRequestException('confirm password is not matched');
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    const activationLink = v4();
    const admin = new this.adminModel({
      ...createAdminDto,
      hashedPassword,
      activationLink,
    });
    await admin.save();

    // await this.mailService.sendConfirmationMail(admin, 'admins');

    return { message: 'Confirm your email' };
  }

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.adminModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    if (!bcrypt.compareSync(loginDto.password, user.hashedPassword)) {
      throw new BadRequestException('password is not matched');
    }
    const tokens = await this.generateTokens(user);
    user.hashedToken = await bcrypt.hash(tokens.refreshToken, 7);
    await user.save();
    res.cookie('refreshToken', tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  async activate(link: string, res: Response) {
    const user = await this.adminModel.findOne({ activationLink: link });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    user.activationLink = null;
    user.isActive = true;
    const tokens = await this.generateTokens(user);
    user.hashedToken = await bcrypt.hash(tokens.refreshToken, 7);
    await user.save();
    res.cookie('refreshToken', tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  async create(createAdminDto: CreateAdminDto) {
    const user = await this.adminModel.findOne({ email: createAdminDto.email });
    if (user) {
      throw new BadRequestException('user is already exists');
    }
    if (createAdminDto.password !== createAdminDto.confirmPassword) {
      throw new BadRequestException('confirm password is not matched');
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    const admin = new this.adminModel({
      ...createAdminDto,
      hashedPassword,
    });
    await admin.save();
    return { message: 'Confirm your email' };
  }

  async generateTokens(admin: AdminDocument) {
    const jwtPayload = {
      id: admin._id,
      isActive: admin.isActive,
      isCreator: admin.isCreator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    const response = {
      accessToken,
      refreshToken,
    };
    return response;
  }

  findAll() {
    return this.adminModel.find().exec();
  }

  findOne(_id: ObjectId) {
    return this.adminModel.findById(_id);
  }

  update(id: ObjectId, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true });
  }

  remove(id: ObjectId) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
