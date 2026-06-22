import { ClassProvider } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { TenantGuard } from '@auth/guards/tenant.guard'

export const TENANT_GUARD_PROVIDER: ClassProvider<TenantGuard> = {
  provide: APP_GUARD,
  useClass: TenantGuard,
}
