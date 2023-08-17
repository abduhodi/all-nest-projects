import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminsModule } from './admins/admins.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';
import { SpecialityModule } from './speciality/speciality.module';
import { WorkerModule } from './worker/worker.module';
import { BlockModule } from './block/block.module';
import { FarmModule } from './farm/farm.module';
import { FarmSpecialityModule } from './farm-speciality/farm-speciality.module';
import { FarmAnimalsModule } from './farm-animals/farm-animals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminsModule,
    MailModule,
    SpecialityModule,
    WorkerModule,
    BlockModule,
    FarmModule,
    FarmSpecialityModule,
    FarmAnimalsModule,
  ],
})
export class AppModule {}
