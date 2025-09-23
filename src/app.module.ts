import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import { SpiModule } from './spi/spi.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mariadb',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   // password: 'root',
    //   database: 'MSL5',
    //   entities: [],
    //   autoLoadEntities: true,
    //   synchronize: true
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    DeviceModule,
    SpiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
