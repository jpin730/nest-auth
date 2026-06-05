import z from 'zod'

export const apiResponseSchema = z.union([
  z.object({
    data: z.unknown(),
  }),
  z.object({
    message: z.string(),
  }),
])

export type ApiResponse = z.infer<typeof apiResponseSchema>
