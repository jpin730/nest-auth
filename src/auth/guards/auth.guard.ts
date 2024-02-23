import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '../auth.service'
import { JwtPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('Token not found')
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      })
      const user = await this.authService.findUserById(payload._id)
      if (!user) {
        throw new UnauthorizedException('User does not exist')
      }
      if (!user.isActive) {
        throw new UnauthorizedException('User is not active')
      }
      request['user'] = user
    } catch (error) {
      console.error(error)

      if (error instanceof HttpException) {
        throw error
      }

      throw new UnauthorizedException('Invalid token')
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers['authorization']?.split(' ') ?? []
    return type === 'Bearer' || typeof token === 'string' ? token : null
  }
}
