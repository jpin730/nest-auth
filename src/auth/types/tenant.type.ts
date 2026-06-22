import { TENANT } from '@auth/consts/tenant.const'

export type Tenant = (typeof TENANT)[keyof typeof TENANT]
