import { DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { DatabaseEnv } from '@config/schemas/database-env.schema'

export const getDataSource = (env: DatabaseEnv): DataSourceOptions => ({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  entities: [__dirname + '/../entities/*.entity.{ts,js}'],
  namingStrategy: new SnakeNamingStrategy(),
})
