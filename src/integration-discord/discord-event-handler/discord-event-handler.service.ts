import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'discord.js';
import directoryFileNameReader from 'src/common/helper-functions/directoryFileNameReader';

@Injectable()
export class DiscordEventHandlerService implements OnModuleInit {
  private readonly EVENT_FILE_PATH: string =
    './src/integration-discord/discord-event-handler/events';
  private readonly eventFileNames: string[];
  constructor() {
    this.eventFileNames = directoryFileNameReader(this.EVENT_FILE_PATH, 'ts');
  }
  onModuleInit() {
    console.log('Starting Event Handler Service');
  }

  setupEventListeners = async (client: Client) => {
    for (const file of this.eventFileNames) {
      const { event } = await import(`./events/${file}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  };
}
