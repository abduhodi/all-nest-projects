import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmSpecialityDto {
  @ApiProperty({
    example: '61234567890abcdef1234567',
    description: 'ID of the farm',
  })
  @IsMongoId()
  farmId: ObjectId;

  @ApiProperty({
    example: '61234567890abcdef1234568',
    description: 'ID of the specialty',
  })
  @IsMongoId()
  spacialityId: ObjectId;
}
