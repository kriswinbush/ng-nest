import { TaskEntity } from '@todo/entity/task.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
} from 'TypeORM';

@Entity('todo')
export class TodoEntity {
	@PrimaryGeneratedColumn('uuid') id: string;
	@Column({ type: 'varchar', nullable: false }) name: string;
	@Column({ type: 'text', nullable: true }) description?: string;
	@CreateDateColumn() createOn?: Date;
	@CreateDateColumn() updatedOn?: Date;

	@OneToMany((type) => TaskEntity, (task) => task.todo) tasks?: TaskEntity[];
}
