import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article') private readonly articleModel: Model<Article>,
  ) {}

  //submit new article
  async insertArticle(
    title: string,
    authors: string[],
    source: string,
    year: number,
    doi: string,
    summary: string,
    claim: string,
    evidence_level: string,
    se_methods: string,
    moderated: string,
    analysed: string,
  ) {
    const newArticle = new this.articleModel({
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
      analysed,
    });
    await newArticle.save();
    return newArticle;
  }

  async updateModeratorStatus(_id: string, inputModerated: string) {
    const article = await this.articleModel.findById(_id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    console.log('Before:', article);
    article.moderated = inputModerated; // Update the 'moderated' field
    article.markModified('moderated');
    console.log('After:', article);
    await article.save();
    return article;
  }

  async updateAnalysedStatus(_id: string, inputAnalysed: string) {
    const article = await this.articleModel.findById(_id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    console.log('Before:', article);
    article.analysed = inputAnalysed; // Update the 'moderated' field
    article.markModified('analysed');
    console.log('After:', article);
    await article.save();
    return article;
  }

  //get one article, search via doi
  async getUser(doi: string) {
    const article = await this.articleModel.findOne({ doi });
    return article;
  }

  async getByID(_id: string) {
    const article = await this.articleModel.findById(_id);
    return article;
  }
  //show all articles in database
  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }
  ß;
  //show all articles that have been analysed to true
  async findAnalysedArticles(): Promise<Article[]> {
    return this.articleModel.find({ analysed: true }).exec();
  }

  //get one article, search via title
  async getArticleByTitle(title: string) {
    const article = await this.articleModel.findOne({ title });
    return article;
  }

  //get articles by method type
  async getArticlesByMethod(method: string): Promise<Article[]> {
    const articles = await this.articleModel
      .find({ se_methods: method })
      .exec();
    return articles;
  }

  //get articles by year range
  async getArticlesByYearRange(
    startYear: number,
    endYear: number,
  ): Promise<Article[]> {
    const articles = await this.articleModel
      .find({ year: { $gte: startYear, $lte: endYear } })
      .exec();
    return articles;
  }

  

  async getUnmoderatedArticles(): Promise<Article[]> {
    const articles = await this.articleModel
      .find({ moderated: 'false' })
      .exec();
    return articles;
  }

  async getModeratedArticles(): Promise<Article[]> {
    const articles = await this.articleModel.find({ moderated: 'true' }).exec();
    return articles;
  }

  async updateArticle(id: string, articleData: Partial<Article>) {
    const article = await this.articleModel.findById(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    Object.assign(article, articleData, { lastEdited: new Date() });
    await article.save();
    return article;
  }

  async deleteArticle(id: string) {
    const result = await this.articleModel.findByIdAndRemove(id);
    if (!result) {
      throw new NotFoundException('Article not found');
    }
    return result;
  }
  
}
