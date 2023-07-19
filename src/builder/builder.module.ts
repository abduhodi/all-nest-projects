import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './models/builder.model';
import { BuilderController } from './builder.controller';
import { BuilderService } from './builder.service';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
