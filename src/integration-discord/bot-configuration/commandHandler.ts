import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as fs from 'fs';
import { Collection, Client } from 'discord.js';

/* 
Finds each command in commands directory -> helper function
for other functions in this module
*/
const commandFileNames: string[] = fs
  .readdirSync('./src/integration-discord/bot-configuration/commands')
  .filter((file) => file.endsWith('.ts'))
  .map((fileName) => {
    return fileName.split('.')[0];
  });

/* 
This function will register all commands in the commands dir on the discord app
server. This allows for better interaction, ie. Auto complete.
The call to discord is done with their native REST module.

This is a 2 step process, first, all previously registered commands are deleted, 
then all commands in commands dir are pushed to the server.
*/

export const deployCommands = async (): Promise<void> => {
  const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;
  const guildCommandsUrl = Routes.applicationGuildCommands(clientId, guildId);

  // Delete existing commands
  const existingCommands = (await rest.get(guildCommandsUrl)) as any;
  for (const command of existingCommands) {
    try {
      await rest.delete(`${guildCommandsUrl}/${command.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  // Deploy commands from directory
  const newCommands = [];
  for (const file of commandFileNames) {
    const { command } = await import(`./commands/${file}`);
    newCommands.push(command.data.toJSON());
  }
  try {
    await rest.put(guildCommandsUrl, {
      body: newCommands,
    });
  } catch (error) {
    console.error(error);
  }
};

/* 
Updates the available commands on a client instance with all commands in commands dir
<k, v> will be <nameOfCommand, commandObject>
*/
export const updateCommandsCollection = async (client: Client): Promise<void> => {
  for (const file of commandFileNames) {
    client.commands = new Collection()
    const { command }: any = await import(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  }
};
