import { Module } from '@nestjs/common'

import { AdminController } from '@admin/controllers/admin.controller'
import { AdminDatabaseService } from '@admin/services/admin-database.service'
import { AdminService } from '@admin/services/admin.service'

import { AuthModule } from '@auth/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [AdminService, AdminDatabaseService],
})
export class AdminModule {}
