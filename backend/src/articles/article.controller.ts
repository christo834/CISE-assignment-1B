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
      articleTitle: result.title
    };
  }

  //vist website /hello
  @Get('/hello')
  getHello(@Request() req): string {
    return 'hello';
  };
  
}