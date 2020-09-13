import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { User } from './entities/user.entity';
import { UserService } from './services/user/user.service';
import { JwtStrategy } from '@api/core/auth/jwt/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN')
                }
            })
        })
    ],
    exports: [
        AuthService,
        UserService
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        JwtStrategy
    ]
})
export class AuthModule { }