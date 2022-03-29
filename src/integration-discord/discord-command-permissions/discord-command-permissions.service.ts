import { Injectable, Logger } from '@nestjs/common';
import { Client, GuildApplicationCommandPermissionData } from 'discord.js';
import JSONdb from 'simple-json-db';

interface Permissions {
  users?: string[];
  roles?: string[];
  channels?: string[];
}

@Injectable()
export class DiscordCommandPermissionsService {
  private readonly LOGGER = new Logger(DiscordCommandPermissionsService.name);
  private readonly persistentStorage = new JSONdb<Permissions>(
    process.env.CONFIG_FILE
  );

  async initialOwnerPermissions(client: Client) {
    const ownerId = client.guilds.cache.get(process.env.GUILD_ID).ownerId;
    const fullPermissions: GuildApplicationCommandPermissionData[] = [];

    const commands = await client.guilds.cache
      .get(process.env.GUILD_ID)
      .commands.fetch();

    commands.forEach((command) => {
      fullPermissions.push({
        id: command.id,
        permissions: [{ id: ownerId, type: 'USER', permission: true }]
      });
    });

    client.guilds.cache
      .get(process.env.GUILD_ID)
      .commands.permissions.set({ fullPermissions });
  }
}
