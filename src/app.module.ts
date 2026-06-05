import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { ConfigModule } from '@config/config.module'
import { DatabaseModule } from '@database/database.module'

import { HealthModule } from '@health/health.module'

import { httpLogger } from '@common/middlewares/http-logger.middleware'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,

    // Features
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(httpLogger).forRoutes('*')
  }
}
