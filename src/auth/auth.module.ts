import { Module } from '@nestjs/common'

import { AuthController } from '@auth/controllers/auth.controller'
import { TENANT_GUARD_PROVIDER } from '@auth/providers/tenant-guard.provider'
import { AuthDatabaseService } from '@auth/services/auth-database.service'
import { AuthService } from '@auth/services/auth.service'
import { JwtService } from '@auth/services/jwt.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthDatabaseService, JwtService, TENANT_GUARD_PROVIDER],
})
export class AuthModule {}
