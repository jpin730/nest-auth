import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { TENANT } from '@auth/consts/tenant.const'
import { AllowedTenants } from '@auth/decorators/allowed-tenants.decorator'
import { Public } from '@auth/decorators/public.decorator'
import { TenantId } from '@auth/decorators/tenant-id.decorator'
import { LoginDto } from '@auth/dtos/login.dto'
import { PatchMeDto } from '@auth/dtos/patch-me.dto'
import { RegisterDto } from '@auth/dtos/register.dto'
import { TokensDto } from '@auth/dtos/tokens.dto'
import { TenantGuard } from '@auth/guards/tenant.guard'
import { TokenGuard } from '@auth/guards/token.guard'
import { AuthService } from '@auth/services/auth.service'

import { ErrorMessage } from '@common/decorators/error-message.decorator'
import type { ApiRequest } from '@common/types/api-request.type'

@UseGuards(TenantGuard, TokenGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @AllowedTenants([TENANT.AUTH])
  @ErrorMessage(AUTH_ERROR_MESSAGE.UNAVAILABLE_REGISTER)
  async register(@Body() body: RegisterDto): Promise<void> {
    await this.authService.register(body)
  }

  @Post('login')
  @Public()
  @ErrorMessage(AUTH_ERROR_MESSAGE.UNAVAILABLE_LOGIN)
  @ZodSerializerDto(TokensDto)
  async login(@Body() body: LoginDto, @TenantId() tenantId: string): Promise<TokensDto> {
    return this.authService.login(body, tenantId)
  }

  @Post('refresh')
  @ErrorMessage(AUTH_ERROR_MESSAGE.UNAVAILABLE_REFRESH)
  async refresh(@Req() req: ApiRequest): Promise<TokensDto> {
    return this.authService.refresh(req)
  }

  @Post('logout')
  @ErrorMessage(AUTH_ERROR_MESSAGE.UNAVAILABLE_LOGOUT)
  async logout(@Req() req: ApiRequest): Promise<void> {
    await this.authService.logout(req)
  }

  @Patch('me')
  @ErrorMessage(AUTH_ERROR_MESSAGE.UNAVAILABLE_PATCH_ME)
  async updateMe(@Req() req: ApiRequest, @Body() body: PatchMeDto): Promise<void> {
    await this.authService.patchUser(req, body)
  }
}
