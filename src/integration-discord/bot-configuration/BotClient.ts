import { Client, ClientOptions, Collection } from 'discord.js';

/* 
 Adding a commands collection here so that the commands can be linked to the client instance.
 This allows us to access all commands linked to the client regardless of where we access the 
 bot in app.
*/
class BotClient extends Client {
  commands: Collection<any, any>;
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}

export default BotClient;
