import { Injectable, OnModuleInit } from '@nestjs/common';
import { Collection, Client, ApplicationCommandDataResolvable } from 'discord.js';
import directoryFileNameReader from 'src/common/helper-functions/directoryFileNameReader';


@Injectable()
export class DiscordCommandHandlerService implements OnModuleInit {
  private readonly COMMAND_FILE_PATH: string = './src/integration-discord/discord-command-handler/commands'
  private readonly commandFileNames: string[];
  constructor() {
    this.commandFileNames = directoryFileNameReader(this.COMMAND_FILE_PATH, 'ts')
  }

  onModuleInit() {
    console.log("Starting Command Handler Service");
  }

  /* 
  Registers all commands in the commands dir on the discord app
  server. This allows for better interaction, ie. Auto complete.
  */
  deployCommands = async (client: Client): Promise<void> => {
    const newCommands: ApplicationCommandDataResolvable[] = []
    for (const file of this.commandFileNames) {
      const { command } = await import(`./commands/${file}`);
      newCommands.push(command.data.toJSON())
    }
    console.log('Uploading Commands');
    client.guilds.cache.get(process.env.GUILD_ID).commands.set(newCommands)
  };

  /* 
  Deletes all registered commands on the discord app
  server. 
  */
  deleteCommands = async (client: Client): Promise<void> => {
    const existingCommands = await client.guilds.cache.get(process.env.GUILD_ID).commands.fetch()
    existingCommands.forEach(command => {
      console.log(`Deleting command: ${command.id}`);
      command.delete()
    })
  }


  /* 
  Replaces/Updates available commands on a client instance with all commands in commands dir
  <k, v> will be <nameOfCommand, commandObject>
  */
  updateCommandsCollection = async (client: Client): Promise<void> => {
    for (const file of this.commandFileNames) {
      client.commands = new Collection()
      const { command }: any = await import(`./commands/${file}`);
      client.commands.set(command.data.name, command);
    }
  };

}
