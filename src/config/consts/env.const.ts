import { config } from 'dotenv'
import z from 'zod'

import { NODE_ENV } from './node-env.const'

config()

const envSchema = z.object({
  NODE_ENV: z.enum(NODE_ENV),
  PORT: z.coerce.number().int().min(1).max(65535),
})

export const ENV = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>
