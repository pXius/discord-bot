import { Module } from '@nestjs/common';
import { DiscordBotCliService } from './discord-bot-cli.service';

@Module({
  providers: [DiscordBotCliService]
})
export class DiscordBotCliModule {}
