import { Reflector } from '@nestjs/core'

import { Tenant } from '@auth/types/tenant.type'

export const AllowedTenants = Reflector.createDecorator<Tenant[]>()
