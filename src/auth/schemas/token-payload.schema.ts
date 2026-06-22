import z from 'zod'

export const tokenPayloadSchema = z.object({
  sub: z.uuid(),
  exp: z.int().positive(),
})
