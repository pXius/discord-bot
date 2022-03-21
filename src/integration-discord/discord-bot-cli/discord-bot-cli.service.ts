import { Injectable } from '@nestjs/common';
import { createInterface, Interface } from 'readline';
import { Logger } from '@nestjs/common';

@Injectable()
export class DiscordBotCliService {
  private readonly LOGGER = new Logger(DiscordBotCliService.name);
  private readonly readLineInterface: Interface;

  constructor() {
    this.readLineInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  cli = () => {
    this.readLineInterface.question('Enter Command..\n', (message) => {
      this.LOGGER.log('Running... ', message);
      this.cli();
    });
  };
}
