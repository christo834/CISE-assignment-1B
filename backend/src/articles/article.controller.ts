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

  //visit http://localhost:8000/article/submit
  @Post('/submit')
  async addArticle(
    @Body('title') title: string,
    @Body('authors') authors: string[],
    @Body('source') source: string,
    @Body('year') year: number,
    @Body('doi') doi: string,
    @Body('summary') summary: string,

    @Body('claim') claim: string,
    @Body('evidence_level') evidence_level: string,
    @Body('se_methods') se_methods: string,
    @Body('moderated') moderated: boolean,
    @Body('analysed') analysed: boolean,
  ) 
  {

    const result = await this.articleService.insertArticle(
      title,
      authors,
      source,
      year,
      doi,
      summary,

      claim,
      evidence_level,
      se_methods,
      moderated,
      analysed

    );
    return {
      msg: 'Article is submited successfully into database',
      articleId: result.id,
      articleTitle: result.title,
    };
  }

  //vist http://localhost:8000/article/hello
  @Get('/hello')
  getHello(@Request() req): string {
    return 'hello';
  }


  //visit http://localhost:8000/article/title/:title with input
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

  //visit http://localhost:8000/article/se_method/:method with input
  @Get('/se_method/:method')
  async getArticlesByMethod(
    @Param('method') method: string,
  ) {
    const articles = await this.articleService.getArticlesByMethod(method);
    if (articles.length > 0) {
      return {
        msg: 'Articles found successfully',
        articles: articles,
      };
    } else {
      return {
        msg: 'No articles found for the provided method',
      };
    }
  }

  //visit http://localhost:8000/article/year/:startYear/:endYear with two inputs
  @Get('/year/:startYear/:endYear')
  async getArticlesByYearRange(
    @Param('startYear') startYear: number,
    @Param('endYear') endYear: number,
  ) {
    const articles = await this.articleService.getArticlesByYearRange(
      startYear,
      endYear,
    );
    if (articles.length > 0) {
      return {
        msg: 'Articles found successfully',
        articles: articles,
      };
    } else {
      return {
        msg: 'No articles found for the provided year range',
      };
    }
  }

  @Get('/all')
async getAllArticles() {
  const articles = await this.articleService.findAll();
  if (articles.length > 0) {
    return {
      msg: 'Articles found successfully',
      articles: articles,
    };
  } else {
    return {
      msg: 'No articles found',
    };
  }
}
}


