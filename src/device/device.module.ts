import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import deviceConfig from './device.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './device.schema';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Device]),
    ConfigModule.forRoot({
      load: [deviceConfig]
    }),
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema }
    ])
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
