import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() registerDTO: RegisterDTO) {
        return this.authService.register(registerDTO);
    }

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Body() loginDTO: LoginDTO) {
        const { identity, password } = loginDTO;
        const result = await this.authService.login(identity, password);
        if (!result) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return result;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        return req.user;
    }

}
