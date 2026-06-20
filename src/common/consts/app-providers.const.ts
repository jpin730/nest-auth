import { APP_EXCEPTION_FILTER_PROVIDER } from '@common/providers/app-exception-filter.provider'
import { APP_RESPONSE_INTERCEPTOR_PROVIDER } from '@common/providers/app-response-interceptor.provider'
import { ZOD_SERIALIZER_INTERCEPTOR_PROVIDER } from '@common/providers/zod-serializer-interceptor.provider'
import { ZOD_VALIDATION_PIPE_PROVIDER } from '@common/providers/zod-validation-pipe.provider'

export const APP_PROVIDERS = [
  // Interceptors
  APP_RESPONSE_INTERCEPTOR_PROVIDER,
  ZOD_SERIALIZER_INTERCEPTOR_PROVIDER,
  // Pipes
  ZOD_VALIDATION_PIPE_PROVIDER,
  // Filters
  APP_EXCEPTION_FILTER_PROVIDER,
] as const
