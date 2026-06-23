import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { Public } from '@auth/decorators/public.decorator'
import { AuthService } from '@auth/services/auth.service'

import { ApiRequest } from '@common/types/api-request.type'

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(Public, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) return true
    const request = context.switchToHttp().getRequest<ApiRequest>()
    const token = request.headers.authorization?.match(/^Bearer (.+)$/)?.at(1)
    if (!token) throw new BadRequestException(AUTH_ERROR_MESSAGE.INVALID_TOKEN)
    request.userId = await this.authService.validateToken(token, request.tenantId)
    request.token = token
    return true
  }
}
