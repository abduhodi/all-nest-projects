import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentLikeDto {
  @ApiProperty({ example: 1, description: 'id number of the comment' })
  @IsNumber()
  @IsNotEmpty()
  commentId: number;

  @ApiProperty({ example: 1, description: 'id number of the user' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
