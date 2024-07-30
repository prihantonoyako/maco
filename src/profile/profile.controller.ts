import { Body, Controller, Get, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ProfileService } from './profile.service';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@Controller()
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly authService: AuthService
    ) {}

    @Post('createProfile')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe)
    async create(@Req() req: Request, @Body() createProfileDTO: CreateProfileDTO) {
        const user = req.user as { username: string; sub: string };
        const { sub } = user;
        return await this.profileService.create(sub, createProfileDTO);
    }

    @Get('getProfile')
    @UseGuards(JwtAuthGuard)
    async show(@Req() req: Request) {
        const user = req.user as { username: string; sub: string };
        const { sub } = user;

        return await this.profileService.findByUserID(sub);
    }

    @Patch('updateProfile')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async update(@Req() req: Request, @Body() updateProfileDTO: UpdateProfileDTO) {
        const user = req.user as { username: string; sub: string};
        const { sub } = user;

        return await this.profileService.update(sub, updateProfileDTO);
    }
}
