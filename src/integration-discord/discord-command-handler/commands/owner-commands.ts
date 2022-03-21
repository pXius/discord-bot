import {
  SlashCommandBuilder,
  roleMention,
  channelMention,
} from '@discordjs/builders';
import { ChannelType } from 'discord-api-types';
import { CommandInteraction } from 'discord.js';

/* 
The following set commands are used to select the channel in which the bot will listen
as well as the user roles allowed to execute commands.
TODO: Permission service
*/

export const command = {
  data: new SlashCommandBuilder()
    .setName('set')
    .setDescription('Bot Configuration')

    // Chanel selection command
    .addSubcommand((subCommand) =>
      subCommand
        .setName('channel')
        .setDescription('The channel this bot should listen in.')
        .addChannelOption((option) =>
          option
            .addChannelType(ChannelType.GuildText)
            .setRequired(true)
            .setName('channel')
            .setDescription('The channel this bot should listen in.'),
        ),
    )

    // Role selection command
    .addSubcommand((subCommand) =>
      subCommand
        .setName('role')
        .setDescription('Set the role allowed to interact with this bot.')
        .addRoleOption((option) =>
          option
            .setRequired(true)
            .setName('role')
            .setDescription('Set the role allowed to interact with this bot.'),
        ),
    ),

  async execute(interaction: CommandInteraction) {
    if (interaction.guild.ownerId !== interaction.member.user.id) {
      await interaction.reply({
        content: 'Only the server owner can use this command.',
        ephemeral: true,
      });
    } else {
      if (interaction.options.getSubcommand() === 'channel') {
        const channel = interaction.options.get('channel').channel;
        interaction.client.listeningChannel = channel.id;
        interaction.reply({
          content: `Updated listening channel to: ${channelMention(
            channel.id,
          )}`,
          ephemeral: true,
        });
      } else if (interaction.options.getSubcommand() === 'role') {
        const role = interaction.options.get('role').role;
        interaction.client.allowedRole = role.id;
        interaction.reply({
          content: `Allowed interaction role set to: ${roleMention(role.id)}`,
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: 'Not a valid argument.',
          ephemeral: true,
        });
      }
    }
  },
};
