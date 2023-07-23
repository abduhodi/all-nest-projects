import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { User } from 'src/users/models/user.model';

export class CreatePhotoDto {
  @ApiProperty({
    example: 'https://www.google.com',
    description: 'Link to the image path',
  })
  @IsUrl()
  link: string;

  @ApiProperty({
    example: 'Mountains',
    description: 'Title for image/images',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '[1, 2]',
    description: 'List of Id number/numbers of user/users',
    type: Array,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  users: User[];
}
