import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  Collection,
  Client,
  ApplicationCommandDataResolvable,
} from 'discord.js';
import directoryFileNameReader from 'src/common/helper-functions/directoryFileNameReader';

@Injectable()
export class DiscordCommandHandlerService implements OnModuleInit {
  private readonly LOGGER = new Logger(DiscordCommandHandlerService.name);
  private readonly COMMAND_FILE_PATH: string =
    './src/integration-discord/discord-command-handler/commands';
  private readonly commandFileNames: string[];
  constructor() {
    this.commandFileNames = directoryFileNameReader(
      this.COMMAND_FILE_PATH,
      'ts',
    );
  }

  onModuleInit() {
    this.LOGGER.log('Starting Command Handler Service');
  }

  /* 
  Registers all commands in the commands dir on the discord app
  server. This allows for better interaction, ie. Auto complete.
  */
  deployCommands = async (client: Client): Promise<void> => {
    const newCommands: ApplicationCommandDataResolvable[] = [];
    for (const file of this.commandFileNames) {
      const { command } = await import(`./commands/${file}`);
      newCommands.push(command.data.toJSON());
    }

    this.LOGGER.log('Starting Commands Upload...');

    await client.guilds.cache
      .get(process.env.GUILD_ID)
      .commands.set(newCommands);

    this.LOGGER.log('Commands Upload Complete');
  };

  /* 
  Deletes all registered commands on the discord app
  server. 
  */
  deleteCommands = async (client: Client): Promise<void> => {
    const existingCommands = await client.guilds.cache
      .get(process.env.GUILD_ID)
      .commands.fetch();

    existingCommands.forEach((command) => {
      this.LOGGER.warn(`Deleting command: ${command.id}`);
      command.delete();
    });
  };

  /* 
  By default the commands in the command folder (and therefor registered commands) are not available
  on the local client instance, this function will add/update the commands on a client instance 
  with all commands in commands directory. Making commands accessible anywhere in the application 
  where the client is accessible.
  <k, v> will be <nameOfCommand, commandObject>
  */
  updateCommandsCollection = async (client: Client): Promise<void> => {
    client.commands = new Collection();
    for (const file of this.commandFileNames) {
      const { command }: any = await import(`./commands/${file}`);
      client.commands.set(command.data.name, command);
    }
  };
}
