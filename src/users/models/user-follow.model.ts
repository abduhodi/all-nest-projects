import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

interface FollowAttribute {
  userId: number;
  followingId: number;
}

@Table({ tableName: 'user_follow' })
export class Follow extends Model<Follow, FollowAttribute> {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  followingId: number;

  @BelongsTo(() => User, 'userId')
  follower: User;

  @BelongsTo(() => User, 'followingId')
  following: User;
}
