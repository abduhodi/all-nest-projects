import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ example: '+998901234567', description: 'user phone number' })
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'password123', description: 'user password' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
