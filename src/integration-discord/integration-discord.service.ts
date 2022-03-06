import { Injectable, OnModuleInit } from '@nestjs/common';
import { setupEventListeners } from './bot-configuration/eventHandler';
import { Client, Intents } from 'discord.js';
import { DiscordCommandHandlerService } from './discord-command-handler/discord-command-handler.service';

@Injectable()
export class IntegrationDiscordService implements OnModuleInit {
  private readonly client: Client;
  private readonly discordCommandService: DiscordCommandHandlerService;

  constructor(discordCommandService: DiscordCommandHandlerService) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.discordCommandService = discordCommandService;
  }

  onModuleInit() {
    this.updateClientCommandsLocal();
    setTimeout(() => {
      this.discordCommandService.deployCommands(this.client); //TODO: Needs to happen after login...
    }, 1000);

    setupEventListeners(this.client); //TODO: This needs to be a module
  }

  updateClientCommandsLocal(): void {
    this.discordCommandService.updateCommandsCollection(this.client);
  }

  login() {
    this.client.login();
  }
}
