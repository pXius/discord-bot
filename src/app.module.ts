import { Module } from '@nestjs/common';
import { IntegrationDiscordModule } from './integration-discord/integration-discord.module';

@Module({
  imports: [IntegrationDiscordModule],
})
export class AppModule {}
