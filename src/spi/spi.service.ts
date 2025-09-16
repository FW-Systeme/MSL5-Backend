import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ANALOG_IN, Entry } from './analog-in.entity';
import { Repository } from 'typeorm';
import { timer } from 'rxjs';


@Injectable()
export class SpiService implements OnModuleInit {
  private readonly logger = new Logger(SpiService.name);

  constructor(
    @InjectRepository(ANALOG_IN)
    private analogInRepository: Repository<ANALOG_IN>,
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>
  ) {}

  async onModuleInit() {
    timer(7000).subscribe(async () => {
      const analogIn = await this.analogInRepository.find();
      this.logger.debug("Fetching all AnalogIn");
      this.logger.debug(JSON.stringify(analogIn));
    })
  }

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
