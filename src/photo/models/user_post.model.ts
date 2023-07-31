import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Posts } from './post.model';

interface UserPostAttribute {
  userId: number;
  photoId: number;
}

@Table({ tableName: 'user_post' })
export class UserPost extends Model<UserPost, UserPostAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Posts)
  @Column({
    type: DataType.INTEGER,
  })
  postId: number;
}
