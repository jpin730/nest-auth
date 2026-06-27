import z from 'zod'

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email().trim().min(1).max(255),
  password_hash: z.string().trim().length(60),
  tenantId: z.uuid(),
})

export const readUserSchema = userSchema.omit({ password_hash: true, tenantId: true })
