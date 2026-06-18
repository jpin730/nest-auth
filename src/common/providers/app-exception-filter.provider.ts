import { ClassProvider } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { AppExceptionFilter } from '@common/filters/app-exception.filter'

export const APP_EXCEPTION_FILTER_PROVIDER: ClassProvider<AppExceptionFilter> = {
  provide: APP_FILTER,
  useClass: AppExceptionFilter,
}
