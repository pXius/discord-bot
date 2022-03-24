import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { DiscordCommand } from 'src/types/common/discord';

export const command: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName('beep')
    .setDescription('Replies with Boop!')
    .setDefaultPermission(false),
  async execute(interaction: CommandInteraction) {
    await interaction.reply({ content: 'Boop', ephemeral: true });
  },
};
