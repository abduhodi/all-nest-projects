import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { User } from 'src/users/models/user.model';

export type File = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export class CreatePostDto {
  @ApiProperty({
    example: '[1, 2]',
    description: 'List of Id number/numbers of user/users',
    type: Array,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  authors: number[];

  // @ApiProperty({
  //   example: 'https://www.google.com',
  //   description: 'Link to the image/video path',
  // })
  // @IsUrl()
  // @IsNotEmpty()
  // main: File;

  @ApiProperty({
    example:
      '[https://www.google.com/image1.jpg, https://www.google.com/image2.png]',
    description: 'List if links to the image/video path',
  })

  // @IsNotEmpty()
  // @IsUrl({}, { each: true })
  files: File[];

  @ApiProperty({
    example: 'Mountains',
    description: 'Title for image/images',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Detailed text about post',
    description: 'Detailed text about post',
  })
  @IsString()
  description: string;
}
