import { Injectable, OnModuleInit } from '@nestjs/common';
import { deployCommands, updateCommandsCollection } from './bot-configuration/commandHandler';
import { setUpEventListeners } from './bot-configuration/eventHandler';
import { Client, Intents } from 'discord.js';

@Injectable()
export class IntegrationDiscordService implements OnModuleInit {
  private client: Client;
  constructor() {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  }

  onModuleInit() {
    deployCommands(); // on discord server
    updateCommandsCollection(this.client) // on client instance
    setUpEventListeners(this.client);
    this.client.login(process.env.DISCORD_TOKEN)
  }
}
