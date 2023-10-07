import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';

@Injectable()
export class ArticleService {

  constructor(@InjectModel('article') private readonly articleModel: Model<Article>) {}
  

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
    moderated: boolean,
    analysed: boolean)
  {

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

  //get one article, search via doi
  async getUser(doi: string) {
    const article = await this.articleModel.findOne({ doi });
    return article;
  }

  //show all articles in database
  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  //get one article, search via title
  async getArticleByTitle(title: string) {
    const article = await this.articleModel.findOne({ title });
    return article;
  }


  //get articles by method type
  async getArticlesByMethod(
    method: string,
  ): Promise<Article[]> {
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
}

