import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';


@Injectable()
export class ArticleService {
  constructor(@InjectModel('article') private readonly articleModel: Model<Article>) {}
  

  //submit new article
  async insertArticle(title: string, authors: string, source: string, year: number, doi: string, claim: string, evidence: string) {
    const lowCaseDoi = doi.toLowerCase();
    const newArticle = new this.articleModel({
      title,
      authors,
      source,
      year,
      lowCaseDoi,
      claim,
      evidence
    });
    await newArticle.save();
    return newArticle;
  }

  //get one article, search via doi
  async getUser(doi: string) {
    const lowCaseDoi = doi.toLowerCase();
    const article = await this.articleModel.findOne({ lowCaseDoi });
    return article;
  }

  //show all articles in database
  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

}