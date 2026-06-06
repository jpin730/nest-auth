import { Body, Controller, Post } from '@nestjs/common'

import { ErrorMessage } from '@common/decorators/error-message.decorator'

import { AUTH_ERROR_MESSAGE } from '../consts/auth-error-message.const'
import { RegisterDto } from '../dtos/register.dto'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ErrorMessage(AUTH_ERROR_MESSAGE.UNAVAILABLE_REGISTER)
  async register(@Body() body: RegisterDto): Promise<void> {
    await this.authService.register(body)
  }
}
