import { createZodDto } from 'nestjs-zod'

import { tokensSchema } from '@auth/schemas/tokens.shema'

export class TokensDto extends createZodDto(tokensSchema) {}
