import { Controller, Get, Logger } from '@nestjs/common';
import { DeviceService } from './device.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('device')
export class DeviceController {
  private readonly logger = new Logger(DeviceController.name);

  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async getDeviceData() {
    return await this.deviceService.getDeviceData();
  }

  
}
