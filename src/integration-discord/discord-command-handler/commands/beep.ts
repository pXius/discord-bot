import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const command = {
  data: new SlashCommandBuilder()
    .setName('beep')
    .setDescription('Replies with Boop!'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply({ content: 'Boop', ephemeral: true });
  },
};
