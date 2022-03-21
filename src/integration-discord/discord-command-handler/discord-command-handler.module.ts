import { Module } from '@nestjs/common';
import { DiscordCommandHandlerService } from './discord-command-handler.service';

@Module({
  providers: [DiscordCommandHandlerService],
  exports: [DiscordCommandHandlerService],
})
export class DiscordCommandHandlerModule {}
