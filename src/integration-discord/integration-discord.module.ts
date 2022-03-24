import { Module } from '@nestjs/common';
import { IntegrationDiscordService } from './integration-discord.service';
import { DiscordCommandHandlerModule } from './discord-command-handler/discord-command-handler.module';
import { DiscordEventHandlerModule } from 'src/integration-discord/discord-event-handler/discord-event-handler.module';
import { DiscordBotCliModule } from './discord-bot-cli/discord-bot-cli.module';
import { DiscordCommandPermissionsModule } from './discord-command-permissions/discord-command-permissions.module';

@Module({
  imports: [
    DiscordCommandHandlerModule,
    DiscordEventHandlerModule,
    DiscordBotCliModule,
    DiscordCommandPermissionsModule,
  ],
  providers: [IntegrationDiscordService],
})
export class IntegrationDiscordModule {}
