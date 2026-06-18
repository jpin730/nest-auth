import { config } from 'dotenv'

import { envSchema } from '@config/schemas/env.schema'

config()

export const ENV = envSchema.parse(process.env)
