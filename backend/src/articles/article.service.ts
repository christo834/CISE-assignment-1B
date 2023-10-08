import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { NotFoundException } from '@nestjs/common';


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
    moderated: number,
    analysed: number
    )
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

  async getUnmoderatedArticles(): Promise<Article[]> {
    const articles = await this.articleModel.find({ moderated: 'true' }).exec();
    return articles;
  }

  async getModeratedArticles(): Promise<Article[]> {
    const articles = await this.articleModel.find({ moderated: 'true' }).exec();
    return articles;
  }
}

