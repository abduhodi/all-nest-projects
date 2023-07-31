import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserComment } from './models/user-comment.model';
import { RolesModule } from '../roles/roles.module';
import { Comment } from '../comment/models/comment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserComment, Comment]),
    forwardRef(() => RolesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
