import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'admin123', description: 'username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ example: '@dMin123', description: 'password of the user' })
  password: string;
}
