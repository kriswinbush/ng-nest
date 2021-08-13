import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '@todo/entity/task.entity';
import { TodoEntity } from '@todo/entity/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(TaskEntity)
		private readonly taskRepo: Repository<TaskEntity>,
		@InjectRepository(TodoEntity)
		private readonly todoRepo: Repository<TodoEntity>,
	) {}
}
