import { HttpException, Injectable, HttpStatus, ConsoleLogger } from '@nestjs/common';
import { todos } from 'src/mock/todo.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/util';
import { TodoDto } from './dto/todo.dto';
import { TodoCreateDto } from './dto/todocreate.dto';
import { TodoEntity } from '@todo/entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class TodoService {
	todos: TodoEntity[] = todos;

	constructor(
		private readonly userService: UserService,
		@InjectRepository(TodoEntity)
		private readonly todoRepo: Repository<TodoEntity>,
	) {}

	async getOneTodo(id: string): Promise<TodoDto> {
		const todo = await this.todoRepo.findOne({
			where: { id },
			relations: ['tasks'],
		});

		if (!todo) {
			throw new HttpException(
				`Todo list doesn't exist`,
				HttpStatus.BAD_REQUEST,
			);
		}
		return toTodoDto(todo);
	}

	async createTodo(todoDto: TodoCreateDto, {username}: UserDto): Promise<TodoDto> {
		const { name, description } = todoDto;

		const owner = await this.userService.findOneUser({where: { username }});
		const todo: TodoEntity = await this.todoRepo.create({
			name,
			description,
			owner,
		});
		await this.todoRepo.save(todo);
		return toPromise(toTodoDto(todo));
	}

	async getAllTodos(): Promise<TodoDto[]> {
		const todos = await this.todoRepo.find({
			relations: ['tasks'],
		});
		console.log(todos);
		return todos.map((todo) => toTodoDto(todo));
	}

	async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
		const { name, description } = todoDto;
		let todo: TodoEntity = await this.todoRepo.findOne({ where: { id } });

		if (!todo) {
			throw new HttpException(
				`Todo list doesn't exist`,
				HttpStatus.BAD_REQUEST,
			);
		}

		todo = {
			id,
			name,
			description,
		};

		await this.todoRepo.update({ id }, todo);

		todo = await this.todoRepo.findOne({
			where: { id },
			relations: ['tasks'],
		});
		return toTodoDto(todo);
	}

	async destroyTodo(id: string): Promise<TodoDto> {
		const todo: TodoEntity = await this.todoRepo.findOne({
			where: { id },
			relations: ['tasks'],
		});

		if (!todo) {
			throw new HttpException(
				`Todo list doesn't exist`,
				HttpStatus.BAD_REQUEST,
			);
		}

		if (todo.tasks && todo.tasks.length > 0) {
			throw new HttpException(
				`Cannot delete this Todo list, it has existing tasks`,
				HttpStatus.FORBIDDEN,
			);
		}
		await this.todoRepo.delete({ id });
		return toTodoDto(todo);
	}
}
