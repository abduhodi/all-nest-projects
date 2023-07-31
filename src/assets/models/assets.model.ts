import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Posts } from '../../photo/models/post.model';

interface AssetAttribute {
  name: string;
  postId: number;
}

@Table({ tableName: 'assets' })
export class Asset extends Model<Asset, AssetAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ForeignKey(() => Posts)
  @Column({
    type: DataType.INTEGER,
  })
  postId: number;

  @BelongsTo(() => Posts)
  post: Posts;
}
