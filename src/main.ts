import 'dotenv/config';
import { createInterface } from 'readline';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IntegrationDiscordService } from './integration-discord/integration-discord.service';

// import readline from 'readline';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const discordBot = app.get<IntegrationDiscordService>(
    IntegrationDiscordService,
  );
  discordBot.login();

  /* 
  Basic idea to take command line input while bot is running.
  */
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const cli = () => {
    rl.question('Enter Command..\n', (message) => {
      console.log('Running... ', message);
      cli();
    });
  };

  setTimeout(() => {
    console.log('Starting CLI...');
    cli();
  }, 10000);
}

bootstrap();
