import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDTO {
  @ApiProperty({ example: 'KAMAZ', description: 'New Machine name' })
  name: string;
  @ApiProperty({ example: 1, description: 'company id' })
  companyId: number;
}
