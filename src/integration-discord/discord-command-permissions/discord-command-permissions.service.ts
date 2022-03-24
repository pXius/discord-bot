import { Injectable, Logger } from '@nestjs/common';
import { Client, GuildApplicationCommandPermissionData } from 'discord.js';

@Injectable()
export class DiscordCommandPermissionsService {
  private readonly LOGGER = new Logger(DiscordCommandPermissionsService.name);

  async initialOwnerPermissions(client: Client) {
    const ownerId = client.guilds.cache.get(process.env.GUILD_ID).ownerId;
    const fullPermissions: GuildApplicationCommandPermissionData[] = [];

    const commands = await client.guilds.cache
      .get(process.env.GUILD_ID)
      .commands.fetch();

    commands.forEach((command) => {
      fullPermissions.push({
        id: command.id,
        permissions: [{ id: ownerId, type: 'USER', permission: true }],
      });
    });

    client.guilds.cache
      .get(process.env.GUILD_ID)
      .commands.permissions.set({ fullPermissions });
  }
}
