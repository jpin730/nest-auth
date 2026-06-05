import { ValueProvider } from '@nestjs/common'

import { ENV } from '../consts/env.const'

export const ENV_TOKEN = Symbol('ENV')

export const ENV_PROVIDER: ValueProvider = {
  provide: ENV_TOKEN,
  useValue: ENV,
}
