import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsMongoId, MaxLength } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateFarmDto {
  @ApiProperty({ example: 'Farm Name', description: 'Name of the farm' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Farm Address', description: 'Address of the farm' })
  @IsString()
  @MaxLength(200)
  address: string;

  @ApiProperty({ example: 'ObjectId123', description: 'Owner ID of the farm' })
  @IsMongoId()
  ownerId: ObjectId;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the farm',
  })
  @IsPhoneNumber('UZ')
  phone: string;
}
