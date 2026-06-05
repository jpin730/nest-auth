import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { HealthModule } from '@health/health.module'

import { httpLogger } from '@common/middlewares/http-logger.middleware'

@Module({
  imports: [
    // Features
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(httpLogger).forRoutes('*')
  }
}
