import z from 'zod'

import { registerSchema } from '@auth/schemas/register.schema'

export const patchMeSchema = z
  .object({ ...registerSchema.pick({ password: true }).shape })
  .partial()
