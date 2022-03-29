import { Injectable, OnModuleInit } from "@nestjs/common";
import { Client, Intents } from "discord.js";
import { DiscordCommandHandlerService } from "./discord-command-handler/discord-command-handler.service";
import { DiscordEventHandlerService } from "./discord-event-handler/discord-event-handler.service";
import { DiscordCommandPermissionsService } from "./discord-command-permissions/discord-command-permissions.service";

@Injectable()
export class IntegrationDiscordService implements OnModuleInit {
  private readonly client: Client;
  private readonly discordCommandService: DiscordCommandHandlerService;
  private readonly discordEventService: DiscordEventHandlerService;
  private readonly discordCommandPermissionsService: DiscordCommandPermissionsService;

  constructor(
    discordCommandService: DiscordCommandHandlerService,
    discordEventService: DiscordEventHandlerService,
    discordCommandPermissionsService: DiscordCommandPermissionsService
  ) {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.discordCommandService = discordCommandService;
    this.discordEventService = discordEventService;
    this.discordCommandPermissionsService = discordCommandPermissionsService;
  }

  onModuleInit() {
    this.client.listeningChannels = [];
    this.updateClientCommandsLocal();
    this.setupEventListeners();
    this.client.on("ready", () => {
      this.deployCommands();
    });
    setTimeout(() => {
      this.discordCommandPermissionsService.initialOwnerPermissions(
        this.client
      );
    }, 5000);
  }

  deployCommands(): void {
    this.discordCommandService.deployCommands(this.client);
  }

  updateClientCommandsLocal(): void {
    this.discordCommandService.updateCommandsCollection(this.client);
  }

  setupEventListeners(): void {
    this.discordEventService.setupEventListeners(this.client);
  }

  login(): void {
    this.client.login();
  }
}
