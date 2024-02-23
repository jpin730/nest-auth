import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { compareSync, hashSync } from 'bcryptjs'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { LoginResponse } from './interfaces/login-response.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashSync(createUserDto.password),
      })
      await newUser.save()
      const user = newUser.toJSON()
      delete user.password
      return user
    } catch (error) {
      this.errorHandler(error)
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().select('-password')
      return users
    } catch (error) {
      this.errorHandler(error)
    }
  }

  update(id: number, updateUserDto: UpdateUserDto): string {
    updateUserDto
    return `This action updates a #${id} auth`
  }

  remove(id: number): string {
    return `This action removes a #${id} auth`
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    try {
      const { email, password } = loginDto
      const userLogged = await this.userModel.findOne({ email })
      if (!userLogged) {
        throw new UnauthorizedException('Invalid credentials')
      }
      if (!compareSync(password, userLogged.password)) {
        throw new UnauthorizedException('Invalid credentials')
      }
      const { _id } = userLogged
      const token = this.generateJWT({ _id }, '1m')
      const refresh = this.generateJWT({ _id }, '2m')
      const user = { ...userLogged.toJSON() }
      delete user.password
      return { ...user, token, refresh }
    } catch (error) {
      this.errorHandler(error)
    }
  }

  async register(createUserDto: CreateUserDto): Promise<LoginResponse> {
    try {
      const user = await this.create(createUserDto)
      const { _id } = user
      const token = this.generateJWT({ _id }, '1m')
      const refresh = this.generateJWT({ _id }, '2m')
      return { ...user, token, refresh }
    } catch (error) {
      this.errorHandler(error)
    }
  }

  async refresh(user: User): Promise<LoginResponse> {
    try {
      const { _id } = user
      const token = this.generateJWT({ _id }, '1m')
      const refresh = this.generateJWT({ _id }, '2m')
      return { ...user, token, refresh }
    } catch (error) {
      this.errorHandler(error)
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).select('-password')
      return user?.toJSON()
    } catch (error) {
      this.errorHandler(error)
    }
  }

  private generateJWT(payload: JwtPayload, expiresIn: string | number): string {
    return this.jwtService.sign(payload, { expiresIn })
  }

  private errorHandler(error: any): void {
    if (error instanceof HttpException) {
      throw error
    }

    console.error(error)

    if (error.code === 11000 && error.keyPattern?.email) {
      throw new BadRequestException('Email already exists')
    }

    throw new InternalServerErrorException(
      'An error occurred while processing your request',
    )
  }
}
