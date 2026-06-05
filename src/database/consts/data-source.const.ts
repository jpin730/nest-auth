import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import z from 'zod'

import { databaseEnvSchema } from '@config/schemas/database-env.schema'

import { getDataSourceOptions } from '../utils/get-data-source-options.util'

config()

const migrationEnvSchema = z.object({
  DB_MIG_USER: z.string().trim().min(1),
  DB_MIG_PASS: z.string().trim().min(1),
  ...databaseEnvSchema.omit({ DB_USER: true, DB_PASS: true }).shape,
})

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
