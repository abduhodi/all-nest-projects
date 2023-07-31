import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Comment } from './comment.model';
import { User } from '../../users/models/user.model';

interface CommentLikeAttribute {
  commentId: number;
  userId: number;
}

@Table({ tableName: 'comment_like' })
export class CommentLike extends Model<CommentLike, CommentLikeAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
  })
  commentId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
