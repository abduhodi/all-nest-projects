import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'admin1', description: 'Name of admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'admin123@mail.ru',
    description: 'login for admin',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: '@dM1nP@5sw0rd',
    description: 'password of admin',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
