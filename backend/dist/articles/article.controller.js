"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async addArticle(title, authors, source, year, doi, summary) {
        const result = await this.articleService.insertArticle(title, authors, source, year, doi, summary);
        return {
            msg: 'Article is submited successfully into database',
            articleId: result.id,
            articleTitle: result.title,
        };
    }
    getHello(req) {
        return 'hello';
    }
    async getArticleByTitle(title) {
        const article = await this.articleService.getArticleByTitle(title);
        if (article) {
            return {
                msg: 'Article found successfully',
                article: article,
            };
        }
        else {
            return {
                msg: 'No article found with the provided title',
            };
        }
    }
    async getArticlesByYearRange(startYear, endYear) {
        const articles = await this.articleService.getArticlesByYearRange(startYear, endYear);
        if (articles.length > 0) {
            return {
                msg: 'Articles found successfully',
                articles: articles,
            };
        }
        else {
            return {
                msg: 'No articles found for the provided year range',
            };
        }
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Post)('/submit'),
    __param(0, (0, common_1.Body)('title')),
    __param(1, (0, common_1.Body)('authors')),
    __param(2, (0, common_1.Body)('source')),
    __param(3, (0, common_1.Body)('year')),
    __param(4, (0, common_1.Body)('doi')),
    __param(5, (0, common_1.Body)('summary')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, String, Number, String, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "addArticle", null);
__decorate([
    (0, common_1.Get)('/hello'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], ArticleController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/title/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticleByTitle", null);
__decorate([
    (0, common_1.Get)('/year/:startYear/:endYear'),
    __param(0, (0, common_1.Param)('startYear')),
    __param(1, (0, common_1.Param)('endYear')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticlesByYearRange", null);
exports.ArticleController = ArticleController = __decorate([
    (0, common_1.Controller)('article'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
//# sourceMappingURL=article.controller.js.map