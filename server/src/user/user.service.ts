import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from '@shared/mapper';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/loginuser.dto';
import { comparePasswords } from '@shared/util';
import { CreateUserDto } from './dto/createUser.dto';
@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>,
	) {}

	async findOneUser(options?: Record<string, unknown>): Promise<UserDto> {
		const user = await this.userRepo.findOne(options);
		return toUserDto(user);
	}

	async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
		const user = await this.userRepo.findOne({ where: { username } });
		if (!user) {
			throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
		}

		const areEqual = await comparePasswords(user.password, password);

		if (!areEqual) {
			throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
		}
		return toUserDto(user);
	}

	async findByPayload({ username }: any): Promise<UserDto> {
		return await this.findOneUser({
			where: { username },
		});
	}

	async createUser(userDto: CreateUserDto): Promise<UserDto> {
		const { username, password, email } = userDto;

		const userInDb = await this.userRepo.count({ username });
		console.log(userInDb);
		if (userInDb) {
			throw new HttpException('User already Exists', HttpStatus.BAD_REQUEST);
		}

		const user: UserEntity = await this.userRepo.create({
			username,
			password,
			email,
		});
		await this.userRepo.save(user);
		return toUserDto(user);
	}
}
