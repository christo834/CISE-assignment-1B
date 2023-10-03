import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { ArticleSchema } from './schemas/article.schema';
import { ArticleService } from './article.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'article', schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
