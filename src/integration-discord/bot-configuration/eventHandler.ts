import * as fs from 'fs';
import { Client } from 'discord.js';

/* 
Filter out all events based on name within events direcotry
*/
const eventFileNames: string[] = fs
  .readdirSync('./src/integration-discord/bot-configuration/events')
  .filter((file) => file.endsWith('.ts'))
  .map((fileName) => {
    return fileName.split('.')[0];
  });

/* 
Sets up listeners on the client instance and will execute events in events dir
mathing the emitted event name.
*/
export const setUpEventListeners = async (client: Client) => {
  for (const file of eventFileNames) {
    const { event } = await import(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

