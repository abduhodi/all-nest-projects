import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from '../photo/models/post.model';
import { UsersService } from '../users/users.service';
import { CreateAssetDto } from './dto/asset.dto';
import { Asset } from './models/assets.model';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(Asset) private readonly assetRepo: typeof Asset,
    private readonly userService: UsersService,
  ) {}

  async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
    return this.assetRepo.create(createAssetDto, { returning: true });
  }

  async getAllAssets(): Promise<Asset[]> {
    return this.assetRepo.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        all: true,
      },
    });
  }

  async getPostAssets(postId: number): Promise<Asset[]> {
    return this.assetRepo.findAll({
      where: { postId },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        all: true,
      },
    });
  }

  async getSingleAsset(id: number): Promise<Asset> {
    return this.assetRepo.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        all: true,
      },
    });
  }

  async deleteAsset(id: number): Promise<number> {
    return this.assetRepo.destroy({ where: { id } });
  }
}
