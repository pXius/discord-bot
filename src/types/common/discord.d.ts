import { Collection } from 'discord.js';

declare module 'discord.js' {
  export interface Client {
    commands: Collection<unknown, any>;
    listeningChannels: string[];
    allowedRoles: string[];
  }
}

export interface DiscordCommand {
  data: SlashCommandBuilder;
  execute(interaction: CommandInteraction<CacheType>): Promise<void>;
  permissions?: any;
}
