import z from 'zod'

import { userSchema } from '@auth/schemas/user.schema'

const [MIN_LENGTH, MAX_LENGTH] = [8, 20]
const ALLOWED_SPECIAL_CHARS = '!@#$%'
const RAW_REGEXP = `^[a-zA-Z0-9${ALLOWED_SPECIAL_CHARS}]{${MIN_LENGTH},${MAX_LENGTH}}$`
const REGEXP = new RegExp(RAW_REGEXP)
const REGEXP_MESSAGE = `password must only contain letters, numbers and special characters: ${ALLOWED_SPECIAL_CHARS}`

export const registerSchema = z.object({
  password: z.string().trim().min(MIN_LENGTH).max(MAX_LENGTH).regex(REGEXP, REGEXP_MESSAGE),
  ...userSchema.omit({ password_hash: true }).shape,
})
