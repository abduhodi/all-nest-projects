import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export type File = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export class CreateVenuePhotoDto {
  @ApiProperty({ example: 1, description: 'venue id' })
  @IsNumber()
  @IsNotEmpty()
  venueId: number;

  @ApiProperty({
    example: '13ewd-v12ew-sksks-wds2d-2wssx.png',
    description: 'link to the venue photo',
  })
  @IsNotEmpty()
  photo: File;
}
