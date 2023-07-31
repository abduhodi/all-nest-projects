import { Module } from '@nestjs/common';
import { AssetService } from './assets.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Asset } from './models/assets.model';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Asset]), UsersModule],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
