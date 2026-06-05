import { HttpException, HttpStatus } from '@nestjs/common'

export const getErrorStatus = (error: unknown): HttpStatus =>
  error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
