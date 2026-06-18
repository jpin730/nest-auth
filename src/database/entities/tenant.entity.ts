import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from '@database/entities/base.entity'
import { UserEntity } from '@database/entities/user.entity'

@Entity('tenants')
export class TenantEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string

  @OneToMany(() => UserEntity, (e) => e.tenant)
  users: UserEntity[]
}
