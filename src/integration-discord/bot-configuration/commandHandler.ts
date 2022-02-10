/* eslint-disable @typescript-eslint/no-var-requires */
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as fs from 'fs';
import { Collection } from 'discord.js';

/* 
Will use this to find each command in commands directory -> helper function
for other functions in this module
*/
const commandFileNames = fs
  .readdirSync('./src/integration-discord/bot-configuration/commands')
  .filter((file) => file.endsWith('.ts'))
  .map((fileName) => {
    return fileName.split('.')[0];
  });

/* 
This function will register all commands in the commands dir on the discord app
server. This allows for better interaction, ie. Auto complete.
The call to discord is done with their native REST module.

This is a 2 step process, first, all existing commands are deleted, then a new array
of commands based off of the files are pushed to the server.
*/

export const deployCommands = async () => {
  console.log('Staring command deployment...');
  const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;
  const guildCommandsUrl = Routes.applicationGuildCommands(clientId, guildId);

  // Delete existing commands
  const existingCommands = (await rest.get(guildCommandsUrl)) as any;
  for (const command of existingCommands) {
    try {
      await rest.delete(`${guildCommandsUrl}/${command.id}`);
      console.log(`${guildCommandsUrl}/${command.id}`);
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
This helper function returns a collection of commands form the commands dir.
<k, v> will be <nameOfCommand, actualCommand>
*/
export const updateCommandsCollection = async () => {
  const commands = new Collection();
  for (const file of commandFileNames) {
    const { command }: any = await import(`./commands/${file}`);
    commands.set(command.data.name, command);
  }
  return commands;
};
