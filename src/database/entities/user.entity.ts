import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import { BaseEntity } from '@database/entities/base.entity'
import { RefreshTokenEntity } from '@database/entities/refresh-token.entity'
import { TenantEntity } from '@database/entities/tenant.entity'

@Entity({ name: 'users' })
@Index(['email', 'tenantId'] satisfies (keyof UserEntity)[], { unique: true })
export class UserEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  tenantId: string

  @Column({
    type: 'varchar',
    length: 255,
  })
  email: string

  @Column({
    type: 'varchar',
    length: 60,
  })
  passwordHash: string

  @ManyToOne(() => TenantEntity, (e) => e.users)
  @JoinColumn()
  tenant: TenantEntity

  @OneToMany(() => RefreshTokenEntity, (e) => e.user)
  refreshTokens: RefreshTokenEntity[]
}
