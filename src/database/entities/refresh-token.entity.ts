import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from './base.entity'
import { UserEntity } from './user.entity'

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 64 })
  tokenHash: string

  @Column({ type: 'timestamptz' })
  expiresAt: Date

  @Column({ type: 'uuid' })
  userId: string

  @ManyToOne(() => UserEntity, (e) => e.refreshTokens, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity
}
