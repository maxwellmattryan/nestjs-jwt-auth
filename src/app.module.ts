import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES_IN: Joi.string().required()
            })
        }),
        TypeOrmModule.forRoot(),
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }