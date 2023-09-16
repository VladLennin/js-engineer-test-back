import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";

async function bootstrap() {
    const PORT = process.env.PORT || 3001
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    app.enableCors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    });

    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    });
}

bootstrap();
