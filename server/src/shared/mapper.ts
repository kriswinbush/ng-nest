import { TodoEntity } from 'src/todo/entity/todo.entity';
import { TodoDto } from 'src/todo/dto/todo.dto';
import { TaskEntity } from '@todo/entity/task.entity';
import { TaskDto } from '@todo/dto/task.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserDto } from 'src/user/dto/user.dto';

export const toTodoDto = (data: TodoEntity): TodoDto => {
	const { id, name, description, tasks, owner } = data;
	let todoDto: TodoDto = { id, name, description, owner};

	if (tasks) {
		todoDto = {
			...todoDto,
			tasks: tasks.map((task: TaskEntity) => toTaskDto(task)),
		};
	}
	return todoDto;
};

export const toTaskDto = (data: TaskEntity): TaskDto => {
	const { id, name } = data;
	const taskDto: TaskDto = { id, name };
	return taskDto;
};

export const toUserDto = (data: UserEntity): UserDto => {
	const { id, username, email } = data;
	const userDto: UserDto = { id, username, email };
	return userDto;
}
