import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserComment } from './models/user-comment.model';
import { Comment } from 'src/comment/models/comment.model';

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
