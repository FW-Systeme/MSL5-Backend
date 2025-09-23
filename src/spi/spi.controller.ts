import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';
import { SpiService } from './spi.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Analog } from './analog.schema';

@Controller('spi')
export class SpiController implements OnModuleInit {

  private readonly logger = new Logger(SpiController.name);
  lastReadAnalogIn: number = 0;
  analogInInterval = 15*60*1000;
  lastReadAnalogOut: number = 0;
  analogOutInterval = 15*60*1000;

  constructor(
    private readonly spiService: SpiService,
  ) {}

  async onModuleInit() {
    let lastReadAnalogIn = (await this.spiService.findAnalog("IN"))?.createdAt;
    let lastReadAnalogOut = (await this.spiService.findAnalog("OUT"))?.createdAt;
    this.lastReadAnalogIn = lastReadAnalogIn ? lastReadAnalogIn.getTime() : 0;
    this.lastReadAnalogOut = lastReadAnalogOut ? lastReadAnalogOut.getTime() : 0;
    this.logger.debug(`Last AnalogIn read at ${new Date(this.lastReadAnalogIn).toISOString()}`);
    this.logger.debug(`Last AnalogOut read at ${new Date(this.lastReadAnalogOut).toISOString()}`);

  }

  @EventPattern('SPI:ANALOG_IN')
  handleSPIAnalogIn(@Payload()data: string) {
    if (Date.now() - this.analogInInterval > this.lastReadAnalogIn) {
      this.lastReadAnalogIn = Date.now();
      let obj: Analog = JSON.parse(data.substring(data.indexOf('{')));
      obj.analogType = "IN";
      this.logger.debug("Received Redis-Data on SPI:ANALOG_IN", JSON.stringify(obj));
    }
  }

  @EventPattern('SPI:ANALOG_OUT')
  handleSPIAnalogOut(@Payload() data: string) {
    if (Date.now() - this.analogOutInterval > this.lastReadAnalogOut) {
      this.lastReadAnalogOut = Date.now();
      let obj: Analog = JSON.parse(data.substring(data.indexOf('{')));
      obj.analogType = "OUT";
      this.logger.debug("Received Redis-Data on SPI:ANALOG_OUT", JSON.stringify(obj));
    }
  }

  // @Get('analog-in')
  // async getAnalogIn() {
  //   return await this.spiService.getLatestAnalog("IN");
  // }

  // @Get('analog-out')
  // async getAnalogOut() {
  //   return await this.spiService.getLatestAnalog("OUT");
  // }

}
