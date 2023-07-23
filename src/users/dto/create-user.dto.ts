import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Ahmad',
    description: 'name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ahmadchik', description: 'username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '@hmaCh1k',
    description:
      'password must contains uppercase, lowercase, number, special character. Length > 7',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
