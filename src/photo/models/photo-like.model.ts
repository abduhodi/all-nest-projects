import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Photo } from './photo.model';
import { User } from 'src/users/models/user.model';

interface PhotoLikeAttribute {
  photoId: number;
  userId: number;
}

@Table({ tableName: 'photo_like' })
export class PhotoLike extends Model<PhotoLike, PhotoLikeAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Photo)
  @Column({
    type: DataType.INTEGER,
  })
  photoId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
