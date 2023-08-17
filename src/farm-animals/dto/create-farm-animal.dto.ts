import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateFarmAnimalDto {
  @ApiProperty({
    example: '61234567890abcdef1234567',
    description: 'ID of the animal',
  })
  @IsMongoId()
  animalId: ObjectId;

  @ApiProperty({
    example: '61234567890abcdef1234568',
    description: 'ID of the farm',
  })
  @IsMongoId()
  farmId: ObjectId;
}
