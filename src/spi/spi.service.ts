import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ANALOG, Entry } from './analog.entity';
import { Repository } from 'typeorm';
import { timer } from 'rxjs';


@Injectable()
export class SpiService implements OnModuleInit {
  private readonly logger = new Logger(SpiService.name);

  constructor(
    @InjectRepository(ANALOG)
    private analogRepository: Repository<ANALOG>,
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>
  ) {}

  async onModuleInit() {
    timer(7000).subscribe(async () => {
      const analogIn = await this.findAnalog("IN");
      this.logger.debug("Fetching all AnalogIn");
      this.logger.debug(JSON.stringify(analogIn));
      timer(3000).subscribe(async () => {
        const analogOut = await this.findAnalog("OUT");
        this.logger.debug("Fetching AnalogOut");
        this.logger.debug(JSON.stringify(analogOut));
      })
    })
  }

  async saveAnalog(data: ANALOG) {
    const entries: Entry[] = [];
    for (let entry of data.Entries) {
      let newEntry = new Entry();
      newEntry = {...entry};
      await this.entryRepository.save(newEntry);
      entries.push(newEntry);
    }
    data.Entries = entries;
    return await this.analogRepository.save(data);
  }

  async findAnalog(type: "IN" | "OUT") {
    return await this.analogRepository.findBy({AnalogType: type});
  }

}
