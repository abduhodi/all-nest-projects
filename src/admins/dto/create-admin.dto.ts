import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the admin' })
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the admin',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the admin',
  })
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({
    example: 'https://t.me/johndoe',
    description: 'Telegram link of the admin',
  })
  @IsString()
  @MaxLength(200)
  tgLink: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the admin',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'password123',
    description: 'Confirm password for validation',
  })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    example: 'Administrator of XYZ Company',
    description: 'Description of the admin',
  })
  @IsString()
  @MaxLength(500)
  description: string;
}
