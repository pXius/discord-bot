import { Module } from '@nestjs/common';
import { DiscordEventHandlerService } from './discord-event-handler.service';

@Module({
  providers: [DiscordEventHandlerService],
  exports: [DiscordEventHandlerService]
})
export class DiscordEventHandlerModule {}
