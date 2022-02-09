import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationDiscordModule } from './integration-discord/integration-discord.module';

@Module({
  imports: [IntegrationDiscordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
