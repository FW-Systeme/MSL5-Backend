import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ANALOG_IN, Entry } from './analog-in.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SpiService {
  private readonly logger = new Logger(SpiService.name);

  constructor(
    @InjectRepository(ANALOG_IN)
    private analogInRepository: Repository<ANALOG_IN>,
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>
  ) {}

  async saveAnalogIn(data: ANALOG_IN) {
    const entries: Entry[] = [];
    for (let entry of data.Entries) {
      let newEntry = new Entry();
      newEntry = {...entry};
      await this.entryRepository.save(newEntry);
      entries.push(newEntry);
    }
    data.Entries = entries;
    return await this.analogInRepository.save(data);
  }

}
