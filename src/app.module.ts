import { Module } from '@nestjs/common'

import { HealthModule } from '@health/health.module'

@Module({
  imports: [
    // Features
    HealthModule,
  ],
})
export class AppModule {}
