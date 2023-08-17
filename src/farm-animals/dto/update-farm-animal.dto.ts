import { PartialType } from '@nestjs/swagger';
import { CreateFarmAnimalDto } from './create-farm-animal.dto';

export class UpdateFarmAnimalDto extends PartialType(CreateFarmAnimalDto) {}
