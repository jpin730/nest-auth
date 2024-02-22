import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum Role {
  Admin = 'admin',
  User = 'user',
}

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  name: string

  @Prop({ default: true })
  isActive: boolean

  @Prop({ required: true, enum: Role, default: Role.User })
  role: Role
}

export const UserSchema = SchemaFactory.createForClass(User)
