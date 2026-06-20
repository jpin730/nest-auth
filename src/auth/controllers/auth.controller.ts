import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { TenantId } from '@auth/decorators/tenant-id.decorator'
import { LoginDto } from '@auth/dtos/login.dto'
import { RegisterDto } from '@auth/dtos/register.dto'
import { TokensDto } from '@auth/dtos/tokens.dto'
import { TenantGuard } from '@auth/guards/tenant.guard'
import { AuthService } from '@auth/services/auth.service'

import { ErrorMessage } from '@common/decorators/error-message.decorator'

@UseGuards(TenantGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: allow register only from auth tenant
  @Post('register')
  @ErrorMessage(AUTH_ERROR_MESSAGE.UNAVAILABLE_REGISTER)
  async register(@Body() body: RegisterDto): Promise<void> {
    await this.authService.register(body)
  }

  @Post('login')
  @ErrorMessage(AUTH_ERROR_MESSAGE.UNAVAILABLE_LOGIN)
  @ZodSerializerDto(TokensDto)
  async login(@Body() body: LoginDto, @TenantId() tenantId: string): Promise<TokensDto> {
    return this.authService.login(body, tenantId)
  }
}
