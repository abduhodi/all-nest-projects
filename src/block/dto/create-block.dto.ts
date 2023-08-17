import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsString, MaxLength } from 'class-validator';

export class CreateBlockDto {
  @ApiProperty({ example: 1, description: 'The block number' })
  @IsInt()
  @Min(1)
  blockNumber: number;

  @ApiProperty({
    example: 'A block description',
    description: 'The block description',
  })
  @IsString()
  @MaxLength(200)
  description: string;
}
