import { createZodDto } from 'nestjs-zod'

import { loginSchema } from '@auth/schemas/login.schema'

export class LoginDto extends createZodDto(loginSchema) {}
