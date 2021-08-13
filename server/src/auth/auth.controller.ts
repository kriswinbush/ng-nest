import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { LoginUserDto } from 'src/user/dto/loginuser.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	getHello() {
		return 'hello there';
	}

	@Post('register')
	public async register(
		@Body() createUserDto: CreateUserDto,
	): Promise<RegistrationStatus> {
		const result: RegistrationStatus = await this.authService.register(
			createUserDto,
		);
		if (!result.success) {
			throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
		}
		return result;
	}

	@Post('login')
	public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
		return await this.authService.login(loginUserDto);
	}

	@Get(':user')
	public async getUser(@Param() user: string) {
		return await this.authService.getUser(user);
	}
}
