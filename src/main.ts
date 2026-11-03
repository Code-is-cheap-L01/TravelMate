import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TravelMate API')
    .setDescription(
      'Two API collections for TravelMate: collaborative itinerary/live trip and contextual expenses/settlement.',
    )
    .setVersion('1.0')
    .addTag('Itinerary Collection')
    .addTag('Expense & Settlement Collection')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs/openapi.json',
    yamlDocumentUrl: 'docs/openapi.yaml',
  });

  await app.init();
  return app;
}

async function bootstrap() {
  const app = await createApp();
  await app.listen(process.env.PORT ?? 3000);
}

if (require.main === module) {
  void bootstrap();
}
