import { Module } from '@nestjs/common'

import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { DatabaseService } from './services/database.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, DatabaseService],
})
export class AuthModule {}
