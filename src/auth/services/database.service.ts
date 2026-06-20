import { Injectable } from '@nestjs/common'
import { createHash } from 'crypto'
import { DataSource } from 'typeorm'

import { TokenPayload } from '@auth/types/token-payload.type'

import { RefreshTokenEntity } from '@database/entities/refresh-token.entity'
import { TenantEntity } from '@database/entities/tenant.entity'
import { UserEntity } from '@database/entities/user.entity'

export const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex')

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

  async saveRefreshToken(token: string, payload: TokenPayload, oldTokenId?: string): Promise<void> {
    await this.dataSource.transaction(async (entityManager) => {
      const refreshToken = entityManager.create(RefreshTokenEntity, {
        userId: payload.sub,
        tokenHash: hashToken(token),
        expiresAt: new Date(payload.exp * 1000),
      })
      await entityManager.save(refreshToken)
      if (oldTokenId) {
        await entityManager.delete(RefreshTokenEntity, { id: oldTokenId })
      }
    })
  }
}
