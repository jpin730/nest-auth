import { ApiProperty } from '@nestjs/swagger'
import { User } from '../entities/user.entity'

export class LoginResponseDto extends User {
  @ApiProperty()
  token: string

  @ApiProperty()
  refresh: string
}
