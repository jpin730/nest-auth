import { Controller, Get, UseGuards } from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'

import { ADMIN_ERROR_MESSAGE } from '@admin/consts/admin-error-message.const'
import { ReadTenantDto } from '@admin/dtos/tenant.dto'
import { AdminService } from '@admin/services/admin.service'

import { TENANT } from '@auth/consts/tenant.const'
import { AllowedTenants } from '@auth/decorators/allowed-tenants.decorator'
import { TenantGuard } from '@auth/guards/tenant.guard'
import { TokenGuard } from '@auth/guards/token.guard'

import { ErrorMessage } from '@common/decorators/error-message.decorator'

@Controller('admin')
@UseGuards(TenantGuard, TokenGuard)
@AllowedTenants([TENANT.AUTH])
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('tenants')
  @ErrorMessage(ADMIN_ERROR_MESSAGE.UNAVAILABLE_GET_TENANTS)
  @ZodSerializerDto([ReadTenantDto])
  async getTenants(): Promise<ReadTenantDto[]> {
    return this.adminService.getTenants()
  }
}
