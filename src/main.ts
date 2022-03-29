import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { IntegrationDiscordService } from "src/integration-discord/integration-discord.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  await app.listen(3000);

  const discordBot = app.get<IntegrationDiscordService>(
    IntegrationDiscordService
  );

  discordBot.login();
}

bootstrap();
