import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Posts } from './post.model';

interface PostLikeAttribute {
  photoId: number;
  userId: number;
}

@Table({ tableName: 'post_like' })
export class PostLike extends Model<PostLike, PostLikeAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Posts)
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
