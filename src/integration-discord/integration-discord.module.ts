import { Module } from '@nestjs/common';
import { IntegrationDiscordService } from './integration-discord.service';

@Module({
  providers: [IntegrationDiscordService],
})
export class IntegrationDiscordModule {}
