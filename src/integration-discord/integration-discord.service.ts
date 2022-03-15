import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Intents } from 'discord.js';
import { DiscordCommandHandlerService } from './discord-command-handler/discord-command-handler.service';
import { DiscordEventHandlerService } from './discord-event-handler/discord-event-handler.service';

@Injectable()
export class IntegrationDiscordService implements OnModuleInit {
  private readonly client: Client;
  private readonly discordCommandService: DiscordCommandHandlerService;
  private readonly discordEventService: DiscordEventHandlerService;

  constructor(
    discordCommandService: DiscordCommandHandlerService,
    discordEventService: DiscordEventHandlerService,
  ) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.discordCommandService = discordCommandService;
    this.discordEventService = discordEventService;
  }

  onModuleInit() {
    this.updateClientCommandsLocal();
    setTimeout(() => {
      this.discordCommandService.deployCommands(this.client); //TODO: Needs to happen after login...
    }, 1000);

    this.discordEventService.setupEventListeners(this.client);
  }

  updateClientCommandsLocal(): void {
    this.discordCommandService.updateCommandsCollection(this.client);
  }

  login(): void {
    this.client.login();
  }
}
