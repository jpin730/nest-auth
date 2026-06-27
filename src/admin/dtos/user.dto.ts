import { createZodDto } from 'nestjs-zod'

import { readUserSchema } from '@admin/schemas/user.schema'

export class ReadUserDto extends createZodDto(readUserSchema) {}
