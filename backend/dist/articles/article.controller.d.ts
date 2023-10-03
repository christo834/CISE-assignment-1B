import { ArticleService } from './article.service';
export declare class ArticleController {
  private readonly articleService;
  constructor(articleService: ArticleService);
  addArticle(
    title: string,
    authors: string[],
    source: string,
    year: number,
    doi: string,
    summary: string,
  ): Promise<{
    msg: string;
    articleId: any;
    articleTitle: string;
  }>;
  getHello(req: any): string;
}
