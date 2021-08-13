import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { LoginUserDto } from 'src/user/dto/loginuser.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { toPromise } from '@shared/util';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
		let status: RegistrationStatus = {
			success: true,
			message: 'user registered',
		};
		try {
			await this.userService.createUser(userDto);
		} catch (err) {
			status = {
				success: false,
				message: err,
			};
		}
		return status;
	}

	async validateUser(payload: JwtPayload): Promise<UserDto> {
		const user = await this.userService.findByPayload(payload);
		if (!user) {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
		}
		return user;
	}

	async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
		const user = await this.userService.findByLogin(loginUserDto);
		const token = this._createToken(user);

		return {
			username: user.username,
			...token,
		};
	}

	private _createToken({ username }: UserDto): any {
		const user: JwtPayload = { username };
		const accessToken = this.jwtService.sign(user);
		return {
			expiresIn: process.env.EXPIRESIN,
			accessToken,
		};
	}

	async getUser(username: any) {
		const user = username.user;
		console.log(user);
		const userDb = await this.userService.findOneUser({ where: { username: user } });
		
		return toPromise({
			...userDb
		});
	}
}
