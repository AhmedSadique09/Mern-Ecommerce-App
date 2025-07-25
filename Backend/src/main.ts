import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDB } from './config/database.module';

async function bootstrap() {
  await connectDB(); // MongoDB connection establish karo

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
}
bootstrap();
