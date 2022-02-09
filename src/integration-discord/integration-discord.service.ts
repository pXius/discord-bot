import { Injectable } from '@nestjs/common';
import DiscordBot from './bot-config';

@Injectable()
export class IntegrationDiscordService {
  private bot: DiscordBot;
  constructor() {
    this.bot = new DiscordBot();
    this.bot.login();
  }
}
