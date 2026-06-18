import { Body, Controller, Post } from '@nestjs/common'

import { AUTH_ERROR_MESSAGE } from '@auth/consts/auth-error-message.const'
import { RegisterDto } from '@auth/dtos/register.dto'
import { AuthService } from '@auth/services/auth.service'

import { ErrorMessage } from '@common/decorators/error-message.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ErrorMessage(AUTH_ERROR_MESSAGE.UNAVAILABLE_REGISTER)
  async register(@Body() body: RegisterDto): Promise<void> {
    await this.authService.register(body)
  }
}
