import { ObjectId } from 'mongoose';

import {
  IsString,
  IsNumber,
  IsPhoneNumber,
  IsMongoId,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  @Min(0)
  experience: number;

  @IsPhoneNumber('UZ')
  phoneNumber: string;

  @IsString()
  @MaxLength(20)
  username: string;

  @IsMongoId()
  speciality: string;
}
