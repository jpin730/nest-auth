import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { createHash } from 'crypto'
import { DataSource, LessThan } from 'typeorm'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { TokenPayload } from '@auth/types/token-payload.type'

import { getErrorMessage } from '@common/utils/get-error-message.util'

import { RefreshTokenEntity } from '@database/entities/refresh-token.entity'
import { TenantEntity } from '@database/entities/tenant.entity'
import { UserEntity } from '@database/entities/user.entity'

export const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex')

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name)

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

  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredTokens(): Promise<void> {
    try {
      await this.dataSource.transaction(async (entityManager) => {
        const { affected } = await entityManager.delete(RefreshTokenEntity, {
          expiresAt: LessThan(new Date()),
        })
        if (affected && affected > 0) {
          this.logger.log(`Cleaned up ${affected} expired refresh tokens`)
        }
      })
    } catch (error) {
      this.logger.error(AUTH_ERROR_MESSAGE.FAILED_CLEANUP_EXPIRED_TOKENS)
      this.logger.error(getErrorMessage(error))
    }
  }
}
