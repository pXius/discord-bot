import { Interaction } from 'discord.js';

export const event = {
  name: 'interactionCreate',

  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) {
      return;
    }

    if (
      interaction.client.listeningChannels.length &&
      !interaction.client.listeningChannels.includes(interaction.channelId)
    ) {
      return;
    }

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  },
};
