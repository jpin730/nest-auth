import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginResponseDto } from './dto/login-response.dto'
import { LoginDto } from './dto/login.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ type: User })
  @UseGuards(AuthGuard)
  @Post('user')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.create(createUserDto)
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: User, isArray: true })
  @UseGuards(AuthGuard)
  @Get('user')
  findAll(): Promise<User[]> {
    return this.authService.findAll()
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ type: User })
  @UseGuards(AuthGuard)
  @Patch('user/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.authService.update(id, updateUserDto)
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ type: User })
  @UseGuards(AuthGuard)
  @Delete('user/:id')
  remove(@Param('id') id: string): Promise<User> {
    return this.authService.remove(id)
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ type: LoginResponseDto })
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto)
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ type: LoginResponseDto })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<LoginResponseDto> {
    return this.authService.register(createUserDto)
  }

  @ApiTags('Auth')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ type: LoginResponseDto })
  @UseGuards(AuthGuard)
  @Get('refresh')
  refresh(@Request() request: Request): Promise<LoginResponseDto> {
    const user = request['user'] as User
    return this.authService.refresh(user)
  }
}
