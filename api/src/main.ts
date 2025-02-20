import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 5000;

  const config = new DocumentBuilder()
    .setTitle('swagger for 3205')
    .setDescription('Documentation')
    .setVersion('1.0')
    .addTag('urls', 'api с короткими ссылками')
    .addTag('analytics', 'api аналитики')
    .build();

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(PORT, () => {
    console.log(`server started = ${PORT}; database = ${process.env.DB_NAME} `);
  });
}
bootstrap();
