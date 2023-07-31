import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostLikeDto {
  @ApiProperty({ example: 1, description: 'id of the post' })
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @ApiProperty({ example: 1, description: 'id of the user' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
