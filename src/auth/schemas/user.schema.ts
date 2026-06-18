import z from 'zod'

export const userSchema = z.object({
  email: z.email().trim().min(1).max(255),
  password_hash: z.string().trim().length(60),
  tenantId: z.uuid(),
})
