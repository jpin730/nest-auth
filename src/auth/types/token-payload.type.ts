import z from 'zod'

import { TokenPayloadSchema } from '@auth/schemas/token-payload.schema'

export type TokenPayload = z.infer<typeof TokenPayloadSchema>
