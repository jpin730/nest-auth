import z from 'zod'

import { NODE_ENV } from '../consts/node-env.const'
import { databaseEnvSchema } from './database-env.schema'

export const envSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV),
  PORT: z.coerce.number().int().min(1).max(65535),
  ...databaseEnvSchema.shape,
})

export type Env = z.infer<typeof envSchema>
