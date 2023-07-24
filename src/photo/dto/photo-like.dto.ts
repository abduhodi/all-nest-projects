import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PhotoLikeDto {
  @ApiProperty({ example: 1, description: 'id of the photo' })
  @IsNumber()
  @IsNotEmpty()
  photoId: number;

  @ApiProperty({ example: 1, description: 'id of the user' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
