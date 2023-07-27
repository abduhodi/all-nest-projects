import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'your email address',
  })
  readonly email: string;

  @ApiProperty({ example: 'p@$sWoR6', description: 'password' })
  readonly password: string;
}
