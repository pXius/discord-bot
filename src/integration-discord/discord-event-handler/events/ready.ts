import { Logger } from '@nestjs/common';
import { Client } from 'discord.js';

const LOGGER = new Logger('EVENT');

export const event = {
  name: 'ready',
  once: true,
  execute(client: Client) {
    LOGGER.log(`Logged in as ${client.user.tag}`);
  },
};
