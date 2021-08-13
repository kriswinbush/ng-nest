import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';
import { TaskDto } from './task.dto';

export class TodoDto {
	@IsNotEmpty()
	id: string;

	@IsNotEmpty()
	name: string;

	
	owner?: UserEntity;
	createOn?: Date;
	description?: string;
	tasks?: TaskDto[];
}
