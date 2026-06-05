import { Inject, Injectable } from '@nestjs/common'

import { type Env } from '../consts/env.const'
import { NodeEnv } from '../consts/node-env.const'
import { ENV_TOKEN } from '../providers/env.provider'

@Injectable()
export class ConfigService {
  constructor(@Inject(ENV_TOKEN) private readonly env: Env) {}

  get nodeEnv(): NodeEnv {
    return this.env.NODE_ENV
  }

  get port(): number {
    return this.env.PORT
  }
}
