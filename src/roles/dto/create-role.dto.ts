import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'USER', description: 'role name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'USER uchun role', description: 'role description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
