import { ApiProperty } from '@nestjs/swagger'
import { MinLength } from 'class-validator'
import { LoginDto } from './login.dto'

export class CreateUserDto extends LoginDto {
  @ApiProperty()
  @MinLength(4)
  name: string
}
