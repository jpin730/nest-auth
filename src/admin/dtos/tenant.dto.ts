import { createZodDto } from 'nestjs-zod'

import { tenantSchema } from '@admin/schemas/tenant.schema'

export class ReadTenantDto extends createZodDto(tenantSchema) {}
