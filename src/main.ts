import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(morgan('tiny'));

    app.use(cookieParser());

    await app.listen(3000);
}

bootstrap();