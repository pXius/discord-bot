import { Module } from '@nestjs/common';
import { DiscordCommandPermissionsService } from './discord-command-permissions.service';

@Module({
  providers: [DiscordCommandPermissionsService],
  exports: [DiscordCommandPermissionsService],
})
export class DiscordCommandPermissionsModule {}
