import { createZodDto } from 'nestjs-zod'

import { registerSchema } from '@auth/schemas/register.schema'

export class RegisterDto extends createZodDto(registerSchema) {}
