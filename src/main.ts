import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppLogger } from '@common/classes/app-logger.class'
import { ConfigService } from '@config/services/config.service'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: new AppLogger() })
  const logger = new Logger('Bootstrap')
  const { port, nodeEnv } = app.get(ConfigService)
  await app.listen(port)
  logger.log(`Environment: ${nodeEnv}`)
  logger.log(`App listening on port: ${port}`)
}
void bootstrap()
