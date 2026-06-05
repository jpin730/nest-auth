import { ClassProvider } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'

export const ZOD_VALIDATION_PIPE_PROVIDER: ClassProvider = {
  provide: APP_PIPE,
  useClass: ZodValidationPipe,
}
