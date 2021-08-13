import { TaskEntity } from '@todo/entity/task.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
	ManyToOne,
} from 'typeorm';

@Entity('todo')
export class TodoEntity {
	@PrimaryGeneratedColumn('uuid') id: string;
	@Column({ type: 'varchar', nullable: false }) name: string;
	@Column({ type: 'text', nullable: true }) description?: string;
	@CreateDateColumn() createOn?: Date;
	@CreateDateColumn() updatedOn?: Date;

	@ManyToOne(type => UserEntity)
	 owner?: UserEntity;
	 
	@OneToMany((type) => TaskEntity, (task) => task.todo) tasks?: TaskEntity[];
}
