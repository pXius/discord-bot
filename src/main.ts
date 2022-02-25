import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IntegrationDiscordService } from './integration-discord/integration-discord.service';
// import readline from 'readline';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const discordBot = app.get<IntegrationDiscordService>(IntegrationDiscordService)
  discordBot.login()


  var readline = require('readline');

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const loller = () => {
    rl.question('Enter Command..\n', (message)=> {
      console.log(message);
      loller()
    })
  }

  // setTimeout(()=>{
  //   loller()
  // },10000)

}

bootstrap();
