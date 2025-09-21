import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from './device/device.module';
import { SpiModule } from './spi/spi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: 'root',
      database: 'MSL5',
      entities: [],
      autoLoadEntities: true,
      synchronize: true
    }),
    DeviceModule,
    SpiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
