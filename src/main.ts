import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:8080", // adjust as needed or use a wildcard during development
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
