import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { timer } from 'rxjs';
import { Analog, ANALOG_DATA, Entry, SPI_TYPE } from './analog.schema';
import { Model } from 'mongoose';


@Injectable()
export class SpiService implements OnModuleInit {
  private readonly logger = new Logger(SpiService.name);

  constructor(
    @InjectModel(Analog.name)
    private analogModel: Model<Analog>,
  ) {}

  async onModuleInit() {
    timer(7000).subscribe(async () => {
      const analogIn = await this.findAnalog("IN");
      this.logger.debug("Fetching last AnalogIn");
      this.logger.debug(JSON.stringify(analogIn));
      timer(3000).subscribe(async () => {
        const analogOut = await this.findAnalog("OUT");
        this.logger.debug("Fetching last AnalogOut");
        this.logger.debug(JSON.stringify(analogOut));
      })
    })
  }

  async saveAnalog(data: Analog) {
    const analog = await this.analogModel.findOne();
    if (!analog) {
      const newAnalog = new this.analogModel(data);
      return await newAnalog.save();
    } else {
      analog.entries.push(...data.entries);
      return await analog.save();
    }
  }

  async findAnalog(type: "IN" | "OUT") {
    return await this.analogModel.findOne({analogType: type});
  }

  convertAnalogData(data: ANALOG_DATA, type: "IN" | "OUT"): Analog {
    let entries: Entry[] = [];
    for (let entry of data.Entries) {
      entries.push({
        val: entry.Value,
        time: Date.now(),
        type: entry.Type,
        unit: entry.Unit
      })
    }
    return {
      device: data.Device,
      analogType: type,
      entries: entries,
      type: data.Type,
      createdAt: new Date()
    }
  }

  // async getLatestAnalog(type: "IN" | "OUT") {
  //   return await this.analogRepository.findOne({
  //     where: { AnalogType: type },
  //     order: { createdAt: 'DESC' },
  //   });
  // }

}
