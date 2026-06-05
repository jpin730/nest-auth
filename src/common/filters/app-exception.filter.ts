import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

import { ERROR_MESSAGE } from '../consts/error-message.const'
import { ApiResponse } from '../schemas/api-response.schema'
import { getErrorMessage } from '../utils/get-error-message.util'
import { getErrorStatus } from '../utils/get-error-status.util'

@Catch()
export class AppExceptionFilter implements ExceptionFilter<unknown> {
  private readonly logger = new Logger(AppExceptionFilter.name)

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(error: unknown, host: ArgumentsHost): void {
    const errorMessage = getErrorMessage(error)
    this.logger.error(errorMessage ?? ERROR_MESSAGE.UNKNOWN)

    const ctx = host.switchToHttp()
    const message =
      error instanceof HttpException && errorMessage ? errorMessage : ERROR_MESSAGE.FALLBACK
    const body: ApiResponse = { message }
    const statusCode = getErrorStatus(error)
    this.httpAdapterHost.httpAdapter.reply(ctx.getResponse(), body, statusCode)
  }
}
