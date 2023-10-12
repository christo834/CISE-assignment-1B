import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersService } from './user.service';
import { UsersController } from './user.controller'; // import UsersController

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController], // add UsersController to controllers array
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
