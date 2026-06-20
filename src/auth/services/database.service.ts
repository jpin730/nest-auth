import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { TenantEntity } from '@database/entities/tenant.entity'
import { UserEntity } from '@database/entities/user.entity'

@Injectable()
export class DatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  findUserByEmail(email: string, tenantId: string): Promise<UserEntity | null> {
    return this.dataSource.manager.findOne(UserEntity, {
      where: { email, tenantId },
    })
  }

  async createUser(user: Partial<UserEntity>): Promise<void> {
    await this.dataSource.transaction(async (entityManager) => {
      const userEntity = entityManager.create(UserEntity, user)
      await entityManager.save(userEntity)
    })
  }

  findTenantByName(name: string): Promise<TenantEntity | null> {
    return this.dataSource.manager.findOne(TenantEntity, { where: { name } })
  }
}
