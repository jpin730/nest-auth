import z from 'zod'

export const tokenSchema = z.jwt()

export const tokensSchema = z.object({
  accessToken: tokenSchema,
  refreshToken: tokenSchema,
})
