import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DeviceService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DeviceService.name);

  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    let device = await this.deviceRepository.find();
    this.logger.debug("DEVICE TABLE " + JSON.stringify(device));
    let ownData = this.configService.get<Device>('device')!;
    this.logger.debug('NAME: ' + JSON.stringify(ownData));
    if (!device || !device.length) {
      this.logger.debug('No device found, creating one from config');
      await this.makeFirstDevice(ownData);
    }
  }

  async getDeviceData() {
    return (await this.deviceRepository.find())[0];
  }

  async makeFirstDevice(data: Device){
    let device = await this.deviceRepository.find();
    this.logger.debug(`Fetched Device Entries: ${JSON.stringify(device)}`);
    if (!device || !device.length) {
      const newDevice = await this.deviceRepository.create(data);
      this.deviceRepository.save(newDevice)
        .then(r => this.logger.debug(`Saved new device: ${JSON.stringify(r)}`))
        .catch(e => this.logger.debug(`Error saving device: ${JSON.stringify(e)}`));
    }
  }

  async updateDeviceData(data: Device) {
    let update = await this.deviceRepository.update(1, data);
    this.logger.debug(`Updated Device: ${JSON.stringify(update)}`);
    return await this.deviceRepository.findOne({ where: { id: 1 } });
  }
}
