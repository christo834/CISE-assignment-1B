// src/user/user.schema.ts

import { Role } from './role.enum';
import { Document, StringExpressionOperatorReturningBoolean } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: Role })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
