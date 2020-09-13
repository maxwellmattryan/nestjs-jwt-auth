import { Controller, HttpCode, Post, Req } from '@nestjs/common';

import { Request } from 'express';

import { User } from '@api/core/auth/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor() { }

    @Post('register')
    @HttpCode(201)
    async registerUser(@Req() request: Request): Promise<User> {
        return new User(request.body);
    }
}