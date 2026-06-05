import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { ConfigModule } from '@config/config.module'
import { DatabaseModule } from '@database/database.module'

import { AuthModule } from '@auth/auth.module'
import { HealthModule } from '@health/health.module'

import { APP_PROVIDERS } from '@common/consts/app-providers.const'
import { httpLogger } from '@common/middlewares/http-logger.middleware'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,

    // Features
    HealthModule,
    AuthModule,
  ],
  providers: [...APP_PROVIDERS],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(httpLogger).forRoutes('*')
  }
}
