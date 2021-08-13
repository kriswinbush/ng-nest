import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '@todo/entity/todo.entity';
import { TaskEntity } from '@todo/entity/task.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
	imports: [
		UserModule,
		AuthModule,
		TypeOrmModule.forFeature([TodoEntity, TaskEntity, UserEntity]),
	],
	controllers: [TodoController, TaskController],
	providers: [TodoService, TaskService],
})
export class TodoModule {}
