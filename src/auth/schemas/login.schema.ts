import z from 'zod'

import { userSchema } from '@auth/schemas/user.schema'

const MAX_LENGTH = 100

export const loginSchema = z.object({
  password: z.string().trim().max(MAX_LENGTH),
  ...userSchema.omit({ password_hash: true, tenantId: true }).shape,
})
