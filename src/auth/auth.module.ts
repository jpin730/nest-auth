import { Module } from '@nestjs/common'

import { AuthController } from '@auth/controllers/auth.controller'
import { AuthService } from '@auth/services/auth.service'
import { DatabaseService } from '@auth/services/database.service'
import { JwtService } from '@auth/services/jwt.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, DatabaseService, JwtService],
})
export class AuthModule {}
