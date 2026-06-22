import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { Public } from '@auth/decorators/public.decorator'
import { tokenSchema } from '@auth/schemas/tokens.shema'
import { AuthDatabaseService } from '@auth/services/auth-database.service'
import { JwtService } from '@auth/services/jwt.service'

import { ApiRequest } from '@common/types/api-request.type'

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authDatabaseService: AuthDatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<true | void>(Public, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<ApiRequest>()
    const rawToken = request.headers.authorization?.match(/^Bearer (.+)$/)?.at(1)
    const parseResult = tokenSchema.safeParse(rawToken)
    if (!parseResult.success) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.INVALID_CREDENTIALS)
    }
    const token = parseResult.data

    const { sub: userId } = await this.jwtService.verifyAsync(token)
    const tenantId = request.tenantId
    const user = await this.authDatabaseService.findUserById(userId, tenantId)
    if (!user) {
      throw new UnauthorizedException(AUTH_ERROR_MESSAGE.INVALID_CREDENTIALS)
    }
    request.userId = userId
    request.token = token
    return true
  }
}
