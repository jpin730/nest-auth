import { Global, Module } from '@nestjs/common'

import { ENV_PROVIDER } from '@config/providers/env.provider'
import { ConfigService } from '@config/services/config.service'

@Global()
@Module({
  providers: [ConfigService, ENV_PROVIDER],
  exports: [ConfigService],
})
export class ConfigModule {}
