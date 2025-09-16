import { Controller, Logger } from '@nestjs/common';
import { SpiService } from './spi.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import type { SPI_MESSAGE } from './spi.model';

@Controller('spi')
export class SpiController {

  private readonly logger = new Logger(SpiController.name);
  lastReadAnalogIn: number = 0;
  analogInInterval = 15*60*1000;
  lastReadAnalogOut: number = 0;
  analogOutInterval = 10*1000;

  constructor(
    private readonly spiService: SpiService,
  ) {}

  @EventPattern('SPI:ANALOG_IN')
  handleSPIAnalogIn(@Payload()data: string) {
    if (Date.now() - this.analogInInterval > this.lastReadAnalogIn) {
      this.lastReadAnalogIn = Date.now();
      let obj = JSON.parse(data.substring(data.indexOf('{')));
      this.logger.debug("Received Redis-Data on SPI:ANALOG_IN", JSON.stringify(obj));
    }
  }

  @EventPattern('SPI:ANALOG_OUT')
  handleSPIAnalogOut(@Payload() data: string) {
    // if (Date.now() - this.analogOutInterval > this.lastReadAnalogOut) {
    //   this.lastReadAnalogOut = Date.now();
    //   let obj = JSON.parse(data.substring(data.indexOf('{')));
    //   this.logger.debug("Received Redis-Data on SPI:ANALOG_OUT", JSON.stringify(obj));
    //   this.spiService.saveAnalogIn(obj)
    //     .then(r => this.logger.debug(`Saved ANALOG_IN to DB ${JSON.stringify(r)}`))
    //     .catch(e => this.logger.error(`Error saving ANALOG_IN to DB ${JSON.stringify(e)}`));
    // }
  }


  // @EventPattern('SPI:RESPONSE_STREAM')
  // handleSPIResponseStream(@Payload() data: any) {
  //   this.logger.debug(`Received Data on SPI:RESPONSE_STREAM - ${JSON.stringify(data)}`);
  // }
}
