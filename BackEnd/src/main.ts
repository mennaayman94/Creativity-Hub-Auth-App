import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new ConsoleLogger({
      colors:true,
      prefix:'AuthApp',
      logLevels:['error', 'warn',"debug","log"]

    })
  });
  app.enableCors({
    origin: 'http://localhost:5173', // Allowed origins
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    credentials: true, 
  });
  app.use(cookieParser());
  // Apply ValidationPipe globally to all incoming requests
  app.useGlobalPipes(new ValidationPipe());


  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
