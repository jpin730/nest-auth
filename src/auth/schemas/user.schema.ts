import z from 'zod'

import { UserRole } from '@database/enums/user-role.enum'

export const userSchema = z.object({
  email: z.email().trim().min(1).max(255),
  password_hash: z.string().trim().length(60),
  role: z.enum(UserRole).optional(),
  tenantId: z.uuid(),
})
