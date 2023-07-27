import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDriverDTO {
  @ApiProperty({ example: 1, description: 'Machine id' })
  machineId: number;
  @ApiProperty({ example: 2, description: 'Driver id' })
  driverId: number;
}
