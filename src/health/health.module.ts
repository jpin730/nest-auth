import { Module } from '@nestjs/common'

import { HealthController } from '@health/controllers/health.controller'

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
