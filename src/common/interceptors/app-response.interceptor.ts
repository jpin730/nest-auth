import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { catchError, map, Observable, throwError } from 'rxjs'

import { ERROR_MESSAGE } from '../consts/error-message.const'
import { ErrorMessage } from '../decorators/error-message.decorator'
import { ApiResponse } from '../schemas/api-response.schema'
import { getErrorMessage } from '../utils/get-error-message.util'
import { getErrorStatus } from '../utils/get-error-status.util'

@Injectable()
export class AppResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AppResponseInterceptor.name)

  constructor(private readonly reflector: Reflector) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<ApiResponse | null> {
    return next.handle().pipe(
      map((data: unknown) => (data ? { data } : null)),
      catchError((error: unknown) => {
        const errorMessage = getErrorMessage(error)
        this.logger.error(errorMessage ?? ERROR_MESSAGE.UNKNOWN)

        const messageFromDecorator = this.reflector.getAllAndOverride(ErrorMessage, [
          ctx.getHandler(),
          ctx.getClass(),
        ])
        const response =
          error instanceof HttpException && errorMessage
            ? errorMessage
            : (messageFromDecorator ?? ERROR_MESSAGE.FALLBACK)
        const status = getErrorStatus(error)
        return throwError(() => new HttpException(response, status))
      }),
    )
  }
}
