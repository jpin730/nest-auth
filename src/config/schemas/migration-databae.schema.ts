import z from 'zod'

import { databaseEnvSchema } from '@config/schemas/database-env.schema'

export const migrationEnvSchema = z.object({
  DB_MIG_USER: z.string().trim().min(1),
  DB_MIG_PASS: z.string().trim().min(1),
  ...databaseEnvSchema.omit({ DB_USER: true, DB_PASS: true }).shape,
})
