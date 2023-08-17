import { IsString, MaxLength } from 'class-validator';

export class CreateSpecialityDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(200)
  description: string;
}
