import { SlashCommandBuilder } from '@discordjs/builders';

export const command = {
  data: new SlashCommandBuilder()
    .setName('beep')
    .setDescription('Replies with Boop!'),
  async execute(interaction) {
    await interaction.reply('Boop!');
  },
};
