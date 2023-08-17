import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address for login',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password for login' })
  @IsString()
  @MinLength(8)
  password: string;
}
