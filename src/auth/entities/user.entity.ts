import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Schema()
export class User {
  @ApiProperty()
  _id?: string

  @ApiProperty()
  @Prop({ unique: true, required: true })
  email: string

  @Prop({ required: true })
  password?: string

  @ApiProperty()
  @Prop({ required: true })
  name: string

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean

  @ApiProperty()
  @Prop({ required: true, enum: Role, default: Role.User })
  role: Role
}

export const UserSchema = SchemaFactory.createForClass(User)
