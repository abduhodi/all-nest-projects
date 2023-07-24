import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: '1', description: 'id number of user' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: '1', description: 'id number of photo' })
  @IsNumber()
  @IsNotEmpty()
  photoId: number;

  @ApiProperty({
    example: 'this is comment text',
    description: 'body of comment',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
