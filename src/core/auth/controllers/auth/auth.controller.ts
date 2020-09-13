import { Controller, HttpCode, Post, Req } from '@nestjs/common';

import { Request } from 'express';

import { User } from '@api/core/auth/entities/user.entity';
import { AuthService } from '@api/core/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    @HttpCode(201)
    async registerUser(@Req() request: Request): Promise<User> {
        return await this.authService.registerUser(request.body);
    }
}