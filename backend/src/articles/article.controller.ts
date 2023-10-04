//Imports required for the controller
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { ArticleService } from './article.service';   //Importing Article Service function from article.service.ts

//Start of ArticleController
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  //visit website /submit
  @Get('/submit')
  //Async function for adding articles in the database
  async addArticle(
    @Body('title') title: string,
    @Body('authors') authors: string[],
    @Body('source') source: string,
    @Body('year') year: number,
    @Body('doi') doi: string,
    @Body('summary') summary: string,
  ) {

    //Storing the results into premade variables
    const result = await this.articleService.insertArticle(
      title,
      authors,
      source,
      year,
      doi,
      summary,
    );

    //Returning message if article was successfully submitted
    return {
      msg: 'Article is submited successfully into database',
      articleId: result.id,
      articleTitle: result.title,
    };
  }

  //Test for checking if @Get works (changed to @Post to make addArticle /submit API work)
  //vist website /hello
  @Post('/hello')
  getHello(@Request() req): string {
    return 'hello';
  }
}
