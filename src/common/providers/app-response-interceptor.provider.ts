import { ClassProvider } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { AppResponseInterceptor } from '@common/interceptors/app-response.interceptor'

export const APP_RESPONSE_INTERCEPTOR_PROVIDER: ClassProvider<AppResponseInterceptor> = {
  provide: APP_INTERCEPTOR,
  useClass: AppResponseInterceptor,
}
