import { Module } from '@nestjs/common';
import { IntegrationDiscordService } from './integration-discord.service';
import { DiscordCommandHandlerModule } from './discord-command-handler/discord-command-handler.module';
import { DiscordCommandHandlerService } from './discord-command-handler/discord-command-handler.service';


@Module({
  imports: [DiscordCommandHandlerModule],
  providers: [IntegrationDiscordService],
})
export class IntegrationDiscordModule {}
// DiscordCommandHandlerServices