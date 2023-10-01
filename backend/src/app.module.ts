import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './articles/article.module';


@Module({
  imports: [
    ArticleModule, MongooseModule.forRoot('mongodb+srv://user1:wO7OY6V0vzwUNEAn@cluster0.yfilps9.mongodb.net/?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
