import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar o prefixo global para as rotas da API
  app.setGlobalPrefix('api');
  
  app.enableCors({
    origin: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  const port = process.env.PORT ?? 3000;
  console.log(`🚀 Application is running on: http://0.0.0.0:${port}/api`);
  
  await app.listen(port, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error('Error starting application:', err);
  process.exit(1);
});
