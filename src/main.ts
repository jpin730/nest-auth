import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppLogger } from '@common/classes/app-logger.class'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: new AppLogger() })

  // TODO: Add validation for port and nodeEnv
  const port = process.env.PORT ?? 3000
  const nodeEnv = process.env.NODE_ENV ?? 'development'

  const logger = new Logger('Bootstrap')
  await app.listen(port)
  logger.log(`Environment: ${nodeEnv}`)
  logger.log(`App listening on port: ${port}`)
}
void bootstrap()
