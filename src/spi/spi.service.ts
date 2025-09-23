import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { timer } from 'rxjs';
import { Analog, ANALOG_DATA, SPI_TYPE, Value } from './analog.schema';
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

  async saveAnalog(data: Analog[]): Promise<Analog[]> {
    const saved: Analog[] = [];
    for (let analog of data) {
      const existing = await this.analogModel.findOne({ analogType: analog.analogType, number: analog.number });
      if (existing) {
        existing.values.concat(analog.values);
        await existing.save();
        this.logger.debug(`Updated existing Analog entry: ${JSON.stringify(existing)}`);
        saved.push(existing);
        continue;
      } else {
        try {
          const newAnalog = new this.analogModel(analog);
          await newAnalog.save();
          this.logger.debug(`Created new Analog entry: ${JSON.stringify(newAnalog)}`);
          saved.push(newAnalog);
          continue;
        } catch (e) {
          this.logger.error(`Error saving new Analog entry: ${e}`);
        }
      }
    }
    return saved;
  }

  async findAnalog(type: "IN" | "OUT") {
    return await this.analogModel.findOne({analogType: type});
  }

  convertAnalogData(data: ANALOG_DATA, type: "IN" | "OUT"): Analog[] {
    const analogs: Analog[] = [];
    for (let entry of data.Entries) {
      const value: Value = {
        val: entry.Value,
        time: Date.now()
      };
      const analog: Analog = {
        number: entry.Number,
        spiType: entry.Type as SPI_TYPE,
        unit: entry.Unit,
        isLogging: entry.IsLogging,
        lowerBound: entry.LowerBound,
        upperBound: entry.UpperBound,
        factor: entry.Factor,
        device: { Bus: data.Device.Bus, Chip: data.Device.Chip },
        type: data.Type,
        analogType: type,
        values: [],
        createdAt: new Date(),
      };
      analog.values.push(value);
      analogs.push(analog);
    }
    return analogs;
  }

  // async getLatestAnalog(type: "IN" | "OUT") {
  //   return await this.analogRepository.findOne({
  //     where: { AnalogType: type },
  //     order: { createdAt: 'DESC' },
  //   });
  // }

}
