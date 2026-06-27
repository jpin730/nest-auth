import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { TenantEntity } from '@database/entities/tenant.entity'

@Injectable()
export class AdminDatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  async getTenants(): Promise<TenantEntity[]> {
    return this.dataSource.manager.find(TenantEntity, { relations: { users: true } })
  }
}
