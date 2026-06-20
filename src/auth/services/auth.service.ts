import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { LoginDto } from '@auth/dtos/login.dto'
import { RegisterDto } from '@auth/dtos/register.dto'
import { TokensDto } from '@auth/dtos/tokens.dto'
import { AuthDatabaseService } from '@auth/services/auth-database.service'
import { JwtService } from '@auth/services/jwt.service'

import { ConfigService } from '@config/services/config.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly authDatabaseService: AuthDatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, password, tenantId } = registerDto
    const existingUser = await this.authDatabaseService.findUserByEmail(email, tenantId)
    if (existingUser) {
      throw new BadRequestException(AUTH_ERROR_MESSAGE.EMAIL_ALREADY_EXISTS)
    }
    const passwordHash = await this.hashPassword(password)
    await this.authDatabaseService.createUser({ ...registerDto, passwordHash })
  }

  async login({ email, password }: LoginDto, tenantId: string): Promise<TokensDto> {
    const user = await this.authDatabaseService.findUserByEmail(email, tenantId)
    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.INVALID_CREDENTIALS)
    }
    const isPasswordValid = await compare(password, user.passwordHash)
    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.INVALID_CREDENTIALS)
    }
    const [accessToken, refreshToken] = await this.generateTokenPair(user.id)
    await this.storeRefreshToken(refreshToken)
    return { accessToken, refreshToken }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.authSaltRounds
    return hash(password, saltRounds)
  }

  private async generateTokenPair(sub: string): Promise<[string, string]> {
    const accessToken = await this.jwtService.sign(sub, '5 minutes')
    const refreshToken = await this.jwtService.sign(sub, '1 hour')
    return [accessToken, refreshToken]
  }

  private async storeRefreshToken(token: string, oldTokenId?: string): Promise<void> {
    const payload = this.jwtService.decode(token)
    await this.authDatabaseService.saveRefreshToken(token, payload, oldTokenId)
  }
}
