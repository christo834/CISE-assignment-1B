import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';

import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  //visit website /submit
  @Post('/submit')
  async addArticle(
    @Body('title') title: string,
    @Body('authors') authors: string[],
    @Body('source') source: string,
    @Body('year') year: number,
    @Body('doi') doi: string,
    @Body('summary') summary: string,
  ) {
    const result = await this.articleService.insertArticle(
      title,
      authors,
      source,
      year,
      doi,
      summary,
    );
    return {
      msg: 'Article is submited successfully into database',
      articleId: result.id,
      articleTitle: result.title,
    };
  }

  //vist website /hello
  @Get('/hello')
  getHello(@Request() req): string {
    return 'hello';
  }

  //get one article, search via title
  @Get('/title/:title')
  async getArticleByTitle(@Param('title') title: string) {
    const article = await this.articleService.getArticleByTitle(title);
    if (article) {
      return {
        msg: 'Article found successfully',
        article: article,
      };
    } else {
      return {
        msg: 'No article found with the provided title',
      };
    }
  }
}