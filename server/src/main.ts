import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { getDBConnectionOptions, runDbMigrations } from 'dist/shared/util';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.forRoot(await getDBConnectionOptions(process.env.NODE_ENV)),
  );
  await runDbMigrations();
  await app.listen(port);

  Logger.log(`Server started on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
