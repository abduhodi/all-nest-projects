import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from './company/company.module';
import { Company } from './company/models/company.model';
import { BuilderModule } from './builder/builder.module';
import { Builder } from './builder/models/builder.model';
import { MachineModule } from './machine/machine.module';
import { Machine } from './machine/models/machine.model';
import { Driver } from './driver/models/driver.model';
import { DriverModule } from './driver/driver.module';
import { MachineDriverModule } from './machine_driver/machine_driver.module';
import { MachineDriver } from './machine_driver/models/machine_driver.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DATABASE,
      models: [Company, Builder, Machine, Driver, MachineDriver],
      autoLoadModels: true,
      logging: true,
    }),
    CompanyModule,
    BuilderModule,
    MachineModule,
    DriverModule,
    MachineDriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
