import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { AllowedTenants } from '@auth/decorators/allowed-tenants.decorator'
import { AuthDatabaseService } from '@auth/services/auth-database.service'
import { Tenant } from '@auth/types/tenant.type'

import { ApiRequest } from '@common/types/api-request.type'

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authDatabaseService: AuthDatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ApiRequest>()
    const tenantName = request.headers['x-tenant']

    const trimmedTenantName = tenantName?.toString().trim() as Tenant

    if (!trimmedTenantName) throw new BadRequestException(AUTH_ERROR_MESSAGE.INVALID_TENANT)

    const allowedTenants = this.reflector.getAllAndOverride(AllowedTenants, [
      context.getHandler(),
      context.getClass(),
    ])

    if (
      Array.isArray(allowedTenants) &&
      allowedTenants.length > 0 &&
      !allowedTenants.includes(trimmedTenantName)
    ) {
      throw new BadRequestException(AUTH_ERROR_MESSAGE.TENANT_NOT_ALLOWED)
    }

    const tenant = await this.authDatabaseService.findTenantByName(trimmedTenantName)

    if (!tenant) throw new BadRequestException(AUTH_ERROR_MESSAGE.INVALID_TENANT)

    request.tenantId = tenant.id
    return true
  }
}
