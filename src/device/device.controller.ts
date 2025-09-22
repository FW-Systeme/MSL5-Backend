import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './device.entity';

@Controller('device')
export class DeviceController {
  private readonly logger = new Logger(DeviceController.name);

  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async getDeviceData() {
    return await this.deviceService.getDeviceData();
  }

  @Post()
  async updateDeviceData(@Body() device: Device) {
    return await this.deviceService.updateDeviceData(device);
  }
  
}
