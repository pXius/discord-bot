import { Module } from '@nestjs/common';
import { IntegrationDiscordService } from './integration-discord.service';
import { DiscordCommandHandlerModule } from './discord-command-handler/discord-command-handler.module';
import { DiscordEventHandlerModule } from 'src/integration-discord/discord-event-handler/discord-event-handler.module';

@Module({
  imports: [DiscordCommandHandlerModule, DiscordEventHandlerModule],
  providers: [IntegrationDiscordService],
})
export class IntegrationDiscordModule {}
