import 'dotenv/config';
import { createInterface } from 'readline';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IntegrationDiscordService } from 'src/integration-discord/integration-discord.service';
import { Logger } from '@nestjs/common';

const LOGGER = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  await app.listen(3000);

  const discordBot = app.get<IntegrationDiscordService>(
    IntegrationDiscordService,
  );

  discordBot.login();

  /* 
  TODO: Basic idea to take command line input to trigger command or
        event updates while bot is running, eliminating the need to
        restart.
        This should probably be a service.
  */
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const cli = () => {
    rl.question('Enter Command..\n', (message) => {
      LOGGER.log('Running... ', message);
      cli();
    });
  };

  setTimeout(() => {
    LOGGER.log('Starting CLI...');
    cli();
  }, 10000);
}

bootstrap();
