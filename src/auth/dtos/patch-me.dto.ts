import { createZodDto } from 'nestjs-zod'

import { patchMeSchema } from '@auth/schemas/patch-me.schema'

export class PatchMeDto extends createZodDto(patchMeSchema) {}
