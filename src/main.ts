import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.enableCors({
    origin: process.env.FRONTEND_URL,
  })
  const config = new DocumentBuilder()
    .setTitle('Nest Auth API')
    .setDescription(
      'This is a simple project to demonstrate how to use JWT authentication with NestJS. It connects to a MongoDB database.',
    )
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, document)
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
