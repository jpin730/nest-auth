import { ConsoleLogger } from '@nestjs/common'

export class AppLogger extends ConsoleLogger {
  protected getTimestamp(): string {
    return new Date().toISOString()
  }
}
