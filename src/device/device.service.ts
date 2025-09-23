import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Device } from './device.entity';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DeviceService implements OnModuleInit {
  private readonly logger = new Logger(DeviceService.name);

  constructor(
    @InjectModel(Device.name)
    private deviceModel: Model<Device>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    let device = await this.deviceModel.findOne();
    this.logger.debug("Device data: " + JSON.stringify(device));
    let ownData = this.configService.get<Device>('device')!;
    this.logger.debug('NAME: ' + JSON.stringify(ownData));
    if (!device) {
      this.logger.debug('No device found, creating one from config');
      await this.makeFirstDevice(ownData);
    }
  }

  async getDeviceData() {
    return await this.deviceModel.findOne();
  }

  async makeFirstDevice(data: Device){
    let device = await this.deviceModel.findOne();
    this.logger.debug(`Fetched Device Entries: ${JSON.stringify(device)}`);
    if (!device) {
      const newDevice = await new this.deviceModel(data);
      newDevice.save()
        .then(r => this.logger.debug(`Saved new device: ${JSON.stringify(r)}`))
        .catch(e => this.logger.debug(`Error saving device: ${JSON.stringify(e)}`));
    }
  }

  async updateDeviceData(data: Device) {
    return await this.deviceModel.findOneAndUpdate({}, data, {upsert: true, new: true});
  }
}
