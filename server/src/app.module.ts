import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class AppModule {
	static forRoot(connOptions: ConnectionOptions): DynamicModule {
		return {
			module: AppModule,
			controllers: [AppController],
			imports: [TodoModule, UsersModule, TypeOrmModule.forRoot(connOptions)],
			providers: [AppService],
		};
	}
}
