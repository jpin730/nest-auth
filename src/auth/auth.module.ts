import { Module } from '@nestjs/common'

import { AuthController } from '@auth/controllers/auth.controller'
import { AuthDatabaseService } from '@auth/services/auth-database.service'
import { AuthService } from '@auth/services/auth.service'
import { JwtService } from '@auth/services/jwt.service'

@Module({
  controllers: [AuthController],
  providers: [AuthDatabaseService, AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
