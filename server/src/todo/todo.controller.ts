import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { toPromise } from 'src/shared/util';
import { TodoListDto } from './dto/todolist.dto';
import { TodoDto } from './dto/todo.dto';
import  { TodoCreateDto } from './dto/todocreate.dto';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async findAll(): Promise<TodoListDto> {
        const todos = await this.todoService.getAllTodos();
        return toPromise({todos});
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<TodoDto> {
        return await this.todoService.getOneTodo(id);
    }

    @Post()
    async createTodo(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
        return await this.todoService.createTodo(todoCreateDto);
    }

    @Put(":id")
    async updateTodo(
        @Param("id") id: string,
        @Body() todoDto: TodoDto
    ): Promise<TodoDto> {
        return await this.todoService.updateTodo(id, todoDto);
    }
    
    @Delete(":id")
    async destroyTodo(@Param(":id") id: string): Promise<TodoDto> {
        return await this.todoService.destroyTodo(id);
    }
}
