// src/user/interfaces/user.interface.ts

import { Document } from 'mongoose';
import { Role } from '../user/role.enum';
export interface User extends Document {
  userId: number;
  username: string;
  password: string;
  role: Role;
}
