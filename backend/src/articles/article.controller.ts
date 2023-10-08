import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Put,
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
    @Body('moderated') moderated: number,
    @Body('analysed') analysed: number,
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
      analysed,
      moderated,


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

  //visit http://localhost:8000/article/all
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

// Add this new endpoint to your ArticleController
//visit http://localhost:8000/article/:id/:moderated 
@Post('/:id/:moderated')
async updateModeratorStatus(
  @Param('id') _id: string,
  @Param('moderated') moderated: string,
) {
  const result = await this.articleService.updateModeratorStatus(_id, moderated);
  return {
    msg: 'Moderated status updated successfully',
    articleTitle: result.id,
    moderatorStatus: result.moderated,
  };
}

//For getting all unmoderated articles
//visit http://localhost:8000/article/unmoderated
@Get('/unmoderated')
  async GetUnmoderatedArticles() {
    const articles = await this.articleService.getUnmoderatedArticles();
    if (articles.length > 0) {
      return {
        msg: 'Unmoderated articles found successfully',
        articles: articles,
      };
    } else {
      return {
        msg: 'No unmoderated articles found',
      };
    }
  }

  //For getting moderated articles
  //visit http://localhost:8000/article/moderated
  @Get('/moderated')
  async GetModeratedartices() {
    const articles = await this.articleService.getModeratedArticles();
    if (articles.length > 0) {
      return {
        msg: 'Moderated articles found successfully',
        articles: articles,
      };
    } else {
      return {
        msg: 'No moderated articles found',
      };
    }
  }

  //Getting article by inputting the ID
  //visit //http://localhost:8000/article/:_id
  @Get('/:_id')
  async getByID( @Param('_id') _id: string) {
    const article = await this.articleService.getByID(_id);
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



