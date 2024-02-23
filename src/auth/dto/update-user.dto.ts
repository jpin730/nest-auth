import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsEnum, IsOptional } from 'class-validator'
import { Role } from '../entities/user.entity'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEnum(Role)
  role: Role

  @IsOptional()
  @IsBoolean()
  isActive: boolean
}
