import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateUserDto): string {
    return this.authService.create(createAuthDto)
  }

  @Get()
  findAll(): string {
    return this.authService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.authService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateUserDto,
  ): string {
    return this.authService.update(+id, updateAuthDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.authService.remove(+id)
  }
}
