import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './articles/article.module';
import * as dotenv from 'dotenv';
import { UsersModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';

dotenv.config();
const OLD_PASSWORD = process.env.OLD_PASSWORD;

@Module({
  imports: [
    ArticleModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      `mongodb+srv://user1:wO7OY6V0vzwUNEAn@cluster0.yfilps9.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
