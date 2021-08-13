import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { runDbMigrations } from './shared/util';

const port = process.env.PORT;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await runDbMigrations();
	await app.listen(port);

	Logger.log(`Server started on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
