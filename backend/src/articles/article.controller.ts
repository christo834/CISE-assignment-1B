import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  //visit website /submit
  @Post('/submit')
  async addArticle(
    @Body('title') title: string,
    @Body('authors') authors: string,
    @Body('source') source: string,
    @Body('year') year: number,
    @Body('doi') doi: string,
    @Body('claim') claim: string,
    @Body('evidence') evidence: string,
  ) 
  {
    const result = await this.articleService.insertArticle(
      title,
      authors,
      source,
      year,
      doi,
      claim,
      evidence
    );
    return {
      msg: 'Article is submited successfully into database',
      articleId: result.id,
      articleTitle: result.title
    };
  }

  //vist website /heloo
  @Get('/hello')
  getHello(@Request() req): string {
    return 'hello';
  };
  
}