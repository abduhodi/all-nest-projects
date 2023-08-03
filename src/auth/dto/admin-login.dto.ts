import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({ example: 'admin123@mail.ru', description: 'admin login' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'asminpassword123', description: 'admin password' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
