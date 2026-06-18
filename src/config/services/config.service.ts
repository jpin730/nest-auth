import { Inject, Injectable } from '@nestjs/common'

import { NodeEnv } from '@config/consts/node-env.const'
import { ENV_TOKEN } from '@config/providers/env.provider'
import { DatabaseEnv } from '@config/schemas/database-env.schema'
import { type Env } from '@config/schemas/env.schema'

@Injectable()
export class ConfigService {
  constructor(@Inject(ENV_TOKEN) private readonly env: Env) {}

  get authSaltRounds(): number {
    return this.env.AUTH_SALT_ROUNDS
  }

  get databaseEnv(): DatabaseEnv {
    return {
      DB_HOST: this.env.DB_HOST,
      DB_PORT: this.env.DB_PORT,
      DB_USER: this.env.DB_USER,
      DB_PASS: this.env.DB_PASS,
      DB_NAME: this.env.DB_NAME,
    }
  }

  get nodeEnv(): NodeEnv {
    return this.env.NODE_ENV
  }

  get port(): number {
    return this.env.PORT
  }
}
