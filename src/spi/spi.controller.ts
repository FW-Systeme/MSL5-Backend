import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';
import { SpiService } from './spi.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Analog, ANALOG_DATA } from './analog.schema';

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
  async handleSPIAnalogIn(@Payload()data: string) {
    if (Date.now() - this.analogInInterval > this.lastReadAnalogIn) {
      this.lastReadAnalogIn = Date.now();
      let obj: ANALOG_DATA = JSON.parse(data.substring(data.indexOf('{')));
      this.logger.debug("Received Redis-Data on SPI:ANALOG_IN", JSON.stringify(obj));
      let analogData = this.spiService.convertAnalogData(obj, "IN");
      let saved = await this.spiService.saveAnalog(analogData);
      // this.logger.debug(`Saved Analog data ${JSON.stringify(saved)}`);
    }
  }

  @EventPattern('SPI:ANALOG_OUT')
  async handleSPIAnalogOut(@Payload() data: string) {
    if (Date.now() - this.analogOutInterval > this.lastReadAnalogOut) {
      this.lastReadAnalogOut = Date.now();
      let obj: ANALOG_DATA = JSON.parse(data.substring(data.indexOf('{')));
      this.logger.debug("Received Redis-Data on SPI:ANALOG_OUT", JSON.stringify(obj));
      let analogData = this.spiService.convertAnalogData(obj, "OUT");
      let saved = await this.spiService.saveAnalog(analogData);
      // this.logger.debug(`Saved Analog data ${JSON.stringify(saved)}`);
    }
  }

  @Get('analog-in')
  async getAnalogIn() {
    return await this.spiService.getAnalog("IN");
  }

  @Get('analog-out')
  async getAnalogOut() {
    return await this.spiService.getAnalog("OUT");
  }

}
