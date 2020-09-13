import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { Request } from 'express';

import { TokenPayload } from '../interfaces/token-payload.interface';

import { User } from '@api/core/auth/entities/user.entity'
import { UserService } from '@api/core/auth/services/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: TokenPayload): Promise<User> {
        return this.userService.getById(payload.id);
    }
}