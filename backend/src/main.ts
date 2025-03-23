import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = app.get(ConfigService);
  console.log("JWT_SECRET:", config.get("JWT_SECRET"));

  await app.listen(5500);
}
bootstrap();
