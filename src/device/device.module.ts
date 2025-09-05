import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { ConfigModule } from '@nestjs/config';
import deviceConfig from './device.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device]),
    ConfigModule.forRoot({
      load: [deviceConfig]
    })
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
