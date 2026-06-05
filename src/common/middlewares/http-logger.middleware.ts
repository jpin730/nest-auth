import { Logger } from '@nestjs/common'
import morgan from 'morgan'

const logger = new Logger('HTTP')

export const httpLogger = morgan('tiny', {
  stream: { write: (message) => logger.log(message.trim()) },
})
