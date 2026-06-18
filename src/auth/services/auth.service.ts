import { BadRequestException, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { RegisterDto } from '@auth/dtos/register.dto'
import { DatabaseService } from '@auth/services/database.service'

import { ConfigService } from '@config/services/config.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, password, tenantId } = registerDto
    const existingUser = await this.databaseService.findUserByEmail(email, tenantId)
    if (existingUser) {
      throw new BadRequestException(AUTH_ERROR_MESSAGE.EMAIL_ALREADY_EXISTS)
    }
    const passwordHash = await this.hashPassword(password)
    await this.databaseService.createUser({ ...registerDto, passwordHash })
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.authSaltRounds
    return hash(password, saltRounds)
  }
}
