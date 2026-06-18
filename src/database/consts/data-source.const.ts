import { config } from 'dotenv'
import { DataSource } from 'typeorm'

import { migrationEnvSchema } from '@config/schemas/migration-databae.schema'

import { getDataSourceOptions } from '@database/utils/get-data-source-options.util'

config()

const { DB_MIG_USER, DB_MIG_PASS, ...migrationEnv } = migrationEnvSchema.parse(process.env)

const dataSourceOptions = getDataSourceOptions({
  ...migrationEnv,
  DB_USER: DB_MIG_USER,
  DB_PASS: DB_MIG_PASS,
})

export const DATA_SOURCE = new DataSource({
  ...dataSourceOptions,
  migrations: [__dirname + '/../migrations/*.ts'],
  logging: true,
})
