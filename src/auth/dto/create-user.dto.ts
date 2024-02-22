import { MinLength } from 'class-validator'
import { LoginDto } from './login.dto'

export class CreateUserDto extends LoginDto {
  @MinLength(4)
  name: string
}
