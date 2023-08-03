import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsArray,
} from 'class-validator';

enum VenueTypeEnum {
  TEAT = 1,
  KINO,
  SPORT,
}

export class CreateVenueDto {
  @ApiProperty({ example: 'Bunyodkor stadioni', description: 'Name of Venue' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Amir Temur street',
    description: 'Address of Venue',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'https://goo.gl/maps/fJqPz552JQKWxHWG8',
    description: 'Location of Venue',
  })
  @IsUrl()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 'https://www.instagram.com/bunyodkorstadium/',
    description: 'Website of Venue',
  })
  @IsUrl()
  @IsNotEmpty()
  site: string;

  @ApiProperty({
    example: '+998712309339',
    description: 'Phone number of Venue',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 1, //[], // TODO: venue typelarni namelarini olib kelish kerak
    description: 'Type of Venue',
  })
  // @IsEnum(VenueTypeEnum)
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  venueTypeId: number[];

  @ApiProperty({
    example: '200X50',
    description: "Schema of Venue's seets",
  })
  @IsString()
  @IsNotEmpty()
  schema: string;

  @ApiProperty({
    example: 2,
    description: 'id of region',
  })
  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @ApiProperty({
    example: 5,
    description: 'id of district',
  })
  @IsNumber()
  @IsNotEmpty()
  districtId: number;
}
