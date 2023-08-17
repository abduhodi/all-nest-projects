import { PartialType } from '@nestjs/swagger';
import { CreateFarmSpecialityDto } from './create-farm-speciality.dto';

export class UpdateFarmSpecialityDto extends PartialType(CreateFarmSpecialityDto) {}
