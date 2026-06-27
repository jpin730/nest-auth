import { Injectable } from '@nestjs/common'

import { ReadTenantDto } from '@admin/dtos/tenant.dto'
import { AdminDatabaseService } from '@admin/services/admin-database.service'

@Injectable()
export class AdminService {
  constructor(private readonly adminDatabaseService: AdminDatabaseService) {}

  getTenants(): Promise<ReadTenantDto[]> {
    return this.adminDatabaseService.getTenants()
  }
}
