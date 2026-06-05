import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @Column({ type: 'uuid', nullable: true })
  createdBy: string | null

  @Column({ type: 'timestamptz', nullable: true })
  updatedAt: Date | null

  @Column({ type: 'uuid', nullable: true })
  updatedBy: string | null
}
