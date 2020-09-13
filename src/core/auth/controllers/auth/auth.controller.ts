import {
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    Post,
    Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '@api/core/auth/jwt/jwt-auth.guard';

import { User } from '@api/core/auth/entities/user.entity';
import { AuthService } from '@api/core/auth/services/auth/auth.service';
import { WrongUserCredentialsWereProvidedException } from '@api/core/auth/exceptions/auth.exception';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    @HttpCode(201)
    @UseInterceptors(ClassSerializerInterceptor)
    async registerUser(@Req() request: Request): Promise<User> {
        return await this.authService.registerUser(request.body);
    }

    @Post('login')
    @HttpCode(200)
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Req() request: Request): Promise<User> {
        const user = await this.authService.authenticateUser(request.body);
        if(!user) throw new WrongUserCredentialsWereProvidedException();

        const jwtCookie = this.authService.generateCookieWithJwtToken(user);
        request.res.setHeader('Set-Cookie', jwtCookie);

        return user;
    }

    @Post('logout')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async logout(@Req() request: Request): Promise<void> {
        request.res.clearCookie('Authentication');
    }
}