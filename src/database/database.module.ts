import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '@config/config.module'
import { NODE_ENV } from '@config/consts/node-env.const'
import { ConfigService } from '@config/services/config.service'

import { getDataSourceOptions } from '@database/utils/get-data-source-options.util'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { databaseEnv, nodeEnv } = configService
        const dataSourceOptions = getDataSourceOptions(databaseEnv)
        const logging = nodeEnv !== NODE_ENV.PRODUCTION
        return { ...dataSourceOptions, logging }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
