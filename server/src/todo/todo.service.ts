import { Logger } from '@nestjs/common';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { todos } from 'src/mock/todo.mock';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/util';
import { v4 as uuidv4 } from 'uuid';
import { TodoDto } from './dto/todo.dto';
import { TodoCreateDto } from './dto/todocreate.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
    todos: TodoEntity[] = todos;

    async getOneTodo(id: string): Promise<TodoDto> {
        const todo = this.todos.find(todo => todo.id === id);
        if(!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }
        return toPromise(toTodoDto(todo));
    }

    async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
        const { name, description } = todoDto;
        const todo: TodoEntity = {
            id: uuidv4(),
            name,
            description
        };

        this.todos.push(todo);
        return toPromise(toTodoDto(todo));
    }

    async getAllTodos(): Promise<TodoEntity[]> {
        return toPromise(this.todos);
    }

    async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
        const idxOfTodo = this.todos.findIndex(todo => todo.id === id);
        const todoToUpdate = this.todos.splice(idxOfTodo,1, {...todoDto, id});
        return toPromise({...todoDto, id});
    }

    async destroyTodo(id: string): Promise<TodoDto> {
        const idxOfTodo = this.todos.findIndex((todo => todo.id === id ));
        const todoDeleted = this.todos.splice(idxOfTodo, 1);
        Logger.log(todoDeleted);
        return toPromise(toTodoDto(todoDeleted[0]));
    }
}
