import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MailModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
