import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user1', description: 'username' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'user email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'p@5@W()rd', description: 'user password' })
  @IsStrongPassword({ minLength: 12 })
  password: string;
}
