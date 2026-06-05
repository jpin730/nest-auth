import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import { UserRole } from '@database/enums/user-role.enum'
import { BaseEntity } from './base.entity'
import { RefreshTokenEntity } from './refresh-token.entity'
import { TenantEntity } from './tenant.entity'

@Entity({ name: 'users' })
@Index(['email', 'tenantId'] satisfies (keyof UserEntity)[], { unique: true })
export class UserEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  tenantId: string

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string

  @Column({
    type: 'varchar',
    length: 60,
  })
  passwordHash: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Viewer,
  })
  role: UserRole

  @ManyToOne(() => TenantEntity, (e) => e.users)
  @JoinColumn()
  tenant: TenantEntity

  @OneToMany(() => RefreshTokenEntity, (e) => e.user)
  refreshTokens: RefreshTokenEntity[]
}
