import { Request } from 'express'

export type ApiRequest = Request & { tenantId: string; userId: string; token: string }
