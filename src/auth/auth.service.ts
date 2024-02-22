import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { hashSync } from 'bcryptjs'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashSync(createUserDto.password),
      })
      await newUser.save()
      return { ...newUser.toJSON(), password: undefined }
    } catch (error) {
      this.errorHandler(error)
    }
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

  private errorHandler(error: any): void {
    console.error(error)

    if (error.code === 11000 && error.keyPattern?.email)
      throw new BadRequestException('Email already exists')

    throw new InternalServerErrorException(
      'An error occurred while processing your request',
    )
  }
}
