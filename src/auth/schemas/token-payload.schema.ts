import z from 'zod'

export const TokenPayloadSchema = z.object({
  sub: z.uuid(),
  exp: z.int().positive(),
})
