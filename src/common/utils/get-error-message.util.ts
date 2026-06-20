import { ZodSerializationException, ZodValidationException } from 'nestjs-zod'
import { TypeORMError } from 'typeorm'
import z from 'zod'

import { ERROR_MESSAGE } from '@common/consts/error-message.const'
import { zodIssueSchema } from '@common/schemas/zod-issue.schema'

const typeORMErrorSchema = z.object({
  driverError: z.object({ message: z.string().trim().min(1) }),
})
const getTypeORMErrorMessage = (error: TypeORMError): string | null => {
  const parseResult = typeORMErrorSchema.safeParse(error)
  if (!parseResult.success) {
    return null
  }
  return parseResult.data.driverError.message
}

const zodErrorResponseSchema = z.object({ errors: z.array(zodIssueSchema) })
const getZodValidationExceptionMessage = (error: ZodValidationException): string | null => {
  const response = error.getResponse()
  const parseResult = zodErrorResponseSchema.safeParse(response)
  if (!parseResult.success) {
    return null
  }
  const { errors } = parseResult.data
  const stringifiedErrors = errors
    .map((issue) => `\t- ${issue.path.join('/')}: ${issue.message}`)
    .join('\n')
  return 'Invalid data:\n' + stringifiedErrors
}

export const getErrorMessage = (error: unknown): string | null => {
  let message: string | null = null
  switch (true) {
    case error instanceof TypeORMError:
      message = getTypeORMErrorMessage(error)
      break
    case error instanceof ZodValidationException:
      message = getZodValidationExceptionMessage(error)
      break
    case error instanceof ZodSerializationException:
      message = ERROR_MESSAGE.SERIALIZATION
      break
    case error instanceof Error:
      message = error.message
      break
  }
  return message
}
