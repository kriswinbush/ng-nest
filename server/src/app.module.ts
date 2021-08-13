import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
	controllers: [AppController],
	imports: [
		UserModule,
		AuthModule,
		TodoModule,
		/*TypeOrmModule.forRoot( {
			type: 'postgres',
			host: 'localhost',
			port: 5445,
			username: 'todo',
			password: 'password123',
			database: 'todo_db',
			synchronize: true,
			logging: true,
			entities: [TodoEntity, TaskEntity],
		} ),*/
		TypeOrmModule.forRootAsync({
			useFactory: async () =>
				Object.assign(await getConnectionOptions(), {
					retryAttempts: 1,
				}),
		}),
	],

	providers: [AppService],
})
export class AppModule {}
