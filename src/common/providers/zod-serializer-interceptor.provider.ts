import { ClassProvider } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ZodSerializerInterceptor } from 'nestjs-zod'

export const ZOD_SERIALIZER_INTERCEPTOR_PROVIDER: ClassProvider = {
  provide: APP_INTERCEPTOR,
  useClass: ZodSerializerInterceptor,
}
