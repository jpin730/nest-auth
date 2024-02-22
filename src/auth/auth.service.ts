import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class AuthService {
  create(createAuthDto: CreateUserDto): string {
    createAuthDto
    return 'This action adds a new auth'
  }

  findAll(): string {
    return `This action returns all auth`
  }

  findOne(id: number): string {
    return `This action returns a #${id} auth`
  }

  update(id: number, updateAuthDto: UpdateUserDto): string {
    updateAuthDto
    return `This action updates a #${id} auth`
  }

  remove(id: number): string {
    return `This action removes a #${id} auth`
  }
}
