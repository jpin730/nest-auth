import { BadRequestException, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { ConfigService } from '@config/services/config.service'

import { AUTH_ERROR_MESSAGE } from '../consts/auth-error-message.const'
import { RegisterDto } from '../dtos/register.dto'
import { DatabaseService } from './database.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, password, tenantId } = registerDto
    const existingUser = await this.databaseService.findExistingUser(email, tenantId)
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
