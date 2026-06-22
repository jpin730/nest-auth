import z from 'zod'

import { tokenPayloadSchema } from '@auth/schemas/token-payload.schema'

export type TokenPayload = z.infer<typeof tokenPayloadSchema>
