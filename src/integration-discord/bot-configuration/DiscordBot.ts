// Discord Classes
import { Intents } from 'discord.js';
import BotClient from './BotClient';
import { deployCommands, updateCommandsCollection } from './commandHandler';

class DiscordBot {
  private client: BotClient;
  constructor() {
    this.client = new BotClient({ intents: [Intents.FLAGS.GUILDS] });
    this.startUpConfig();
    this.interactionConfig();
    this.initiateCommandHandling();
  }

  // Configure once off bot action when started and logged in
  startUpConfig(): void {
    this.client.once('ready', () => {
      console.log('Ready!');
    });
  }

  // Configure what bot should do on interaction
  interactionConfig(): void {
    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = this.client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    });
  }

  login(): void {
    this.client.login(process.env.DISCORD_TOKEN);
  }

  /* 
  Ensures discord server and bot has latest commands.
  */
  initiateCommandHandling() {
    deployCommands();
    updateCommandsCollection().then((updatedCommands) => {
      this.client.commands = updatedCommands;
    });
  }
}

export default DiscordBot;
