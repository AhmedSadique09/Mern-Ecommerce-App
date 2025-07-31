import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDB } from './config/database.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  await connectDB();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(new LoggerMiddleware().use);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Server is running on port ${process.env.PORT || 3000}`);
}
bootstrap();
