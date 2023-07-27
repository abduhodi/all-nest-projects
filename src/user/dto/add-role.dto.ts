import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDTO {
  @ApiProperty({ example: '1', description: 'user id' })
  readonly userId: number;
  @ApiProperty({ example: 'USER', description: 'user role (USER | ADMIN...)' })
  readonly value: string;
}
