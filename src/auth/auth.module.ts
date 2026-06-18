import { Module } from '@nestjs/common'

import { AuthController } from '@auth/controllers/auth.controller'
import { AuthService } from '@auth/services/auth.service'
import { DatabaseService } from '@auth/services/database.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, DatabaseService],
})
export class AuthModule {}
