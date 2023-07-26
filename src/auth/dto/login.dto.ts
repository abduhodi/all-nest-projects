import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'ahmadchik', description: 'username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ example: '@hmaCh1k', description: 'password of the user' })
  password: string;
}
