import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://danielllip:<danielllip>@cluster0.yfilps9.mongodb.net/?retryWrites=true&w=majority'), PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
