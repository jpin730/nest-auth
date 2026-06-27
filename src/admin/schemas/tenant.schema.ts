import z from 'zod'

import { readUserSchema } from '@admin/schemas/user.schema'

export const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  users: z.array(readUserSchema),
})
