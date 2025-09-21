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
    private entryRepository: Repository<Entry>,
  ) {}

  async onModuleInit() {
    timer(7000).subscribe(async () => {
      const analogInData = await this.findAnalog("IN");
      const analogIn = analogInData[analogInData.length - 1];
      this.logger.debug("Fetching last AnalogIn");
      this.logger.debug(JSON.stringify(analogIn));
      timer(3000).subscribe(async () => {
        const analogOutData = await this.findAnalog("OUT");
        const analogOut = analogOutData[analogOutData.length - 1];
        this.logger.debug("Fetching last AnalogOut");
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

  async getLatestAnalog(type: "IN" | "OUT") {
    return await this.analogRepository.findOne({
      where: { AnalogType: type },
      order: { createdAt: 'DESC' },
    });
  }

}
