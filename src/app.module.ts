import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { ConfigModule } from '@config/config.module'
import { DatabaseModule } from '@database/database.module'

import { AdminModule } from '@admin/admin.module'
import { AuthModule } from '@auth/auth.module'
import { HealthModule } from '@health/health.module'

import { APP_PROVIDERS } from '@common/consts/app-providers.const'
import { httpLogger } from '@common/middlewares/http-logger.middleware'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ScheduleModule.forRoot(),

    // Features
    AdminModule,
    AuthModule,
    HealthModule,
  ],
  providers: [...APP_PROVIDERS],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(httpLogger).forRoutes('*')
  }
}
