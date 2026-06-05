import z from 'zod'

export const databaseEnvSchema = z.object({
  DB_HOST: z.string().trim().min(1),
  DB_PORT: z.coerce.number().int().min(1).max(65535),
  DB_USER: z.string().trim().min(1),
  DB_PASS: z.string().trim().min(1),
  DB_NAME: z.string().trim().min(1),
})

export type DatabaseEnv = z.infer<typeof databaseEnvSchema>
