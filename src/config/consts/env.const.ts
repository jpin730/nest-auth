import { config } from 'dotenv'

import { envSchema } from '../schemas/env.schema'

config()

export const ENV = envSchema.parse(process.env)
