import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto): string {
    createAuthDto
    return 'This action adds a new auth'
  }

  findAll(): string {
    return `This action returns all auth`
  }

  findOne(id: number): string {
    return `This action returns a #${id} auth`
  }

  update(id: number, updateAuthDto: UpdateAuthDto): string {
    updateAuthDto
    return `This action updates a #${id} auth`
  }

  remove(id: number): string {
    return `This action removes a #${id} auth`
  }
}
