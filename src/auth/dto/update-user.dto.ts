import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsOptional } from 'class-validator'
import { Role } from '../entities/user.entity'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ enum: Role, required: false })
  @IsOptional()
  @IsEnum(Role)
  role: Role

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive: boolean
}
