import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Comment } from '../../comment/models/comment.model';

@Table({ tableName: 'user_comment' })
export class UserComment extends Model<UserComment> {
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

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
  })
  commentId: number;
}
