import { ArticleService } from './article.service';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    addArticle(title: string, authors: string[], source: string, year: number, doi: string, summary: string, claim: string, evidence_level: string, se_methods: string, moderated: boolean, analysed: boolean): Promise<{
        msg: string;
        articleId: any;
        articleTitle: string;
    }>;
    getHello(req: any): string;
}
