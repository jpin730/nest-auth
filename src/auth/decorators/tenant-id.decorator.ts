import { createParamDecorator } from '@nestjs/common'

import { ApiRequest } from '@common/types/api-request.type'

export const TenantId = createParamDecorator((_, ctx) => {
  const request = ctx.switchToHttp().getRequest<ApiRequest>()
  return request.tenantId
})
