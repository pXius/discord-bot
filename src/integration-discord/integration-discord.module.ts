import { Module } from '@nestjs/common';
import { IntegrationDiscordService } from './integration-discord.service';
import { IntegrationDiscordController } from './integration-discord.controller';

@Module({
  providers: [IntegrationDiscordService],
  controllers: [IntegrationDiscordController],
})
export class IntegrationDiscordModule {}
