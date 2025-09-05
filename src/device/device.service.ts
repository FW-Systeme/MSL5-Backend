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
    let ownData = this.configService.get<Device>('device');
    this.logger.debug('NAME: ' + JSON.stringify(ownData));
  }


  async makeFirstDevice(){
    let device = await this.deviceRepository.find();
    this.logger.debug(`Fetched Device Entries: ${JSON.stringify(device)}`);
    if (!device || !device.length) {
      const newDevice = await this.deviceRepository.create({
        city: 'Oldenburg',
        createdAt: new Date(),
        description: 'MSL5 Test Device',
        isActive: true,
        manufacturer: 'FW-Systeme',
        name: 'MSL5Test',
        object: '',
        period: 60,
        postalcode: '26133',
        street: 'Steinkamp 22',
      })
      this.deviceRepository.save(newDevice)
        .then(r => this.logger.debug(`Saved new device: ${JSON.stringify(r)}`))
        .catch(e => this.logger.debug(`Error saving device: ${JSON.stringify(e)}`));
    }
  }

}
