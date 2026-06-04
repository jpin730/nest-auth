import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

@Controller('health')
export class HealthController {
  // TODO: Add public decorator
  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  check(): void {}
}
