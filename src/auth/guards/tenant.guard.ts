import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { AuthDatabaseService } from '@auth/services/auth-database.service'

import { ApiRequest } from '@common/types/api-request.type'

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly authDatabaseService: AuthDatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ApiRequest>()
    const tenantName = request.headers['x-tenant']

    const trimmed = tenantName?.toString().trim()

    if (!trimmed) throw new BadRequestException(AUTH_ERROR_MESSAGE.INVALID_TENANT)

    const tenant = await this.authDatabaseService.findTenantByName(trimmed)

    if (!tenant) throw new BadRequestException(AUTH_ERROR_MESSAGE.INVALID_TENANT)

    request.tenantId = tenant.id
    return true
  }
}
