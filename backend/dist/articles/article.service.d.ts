/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
export declare class ArticleService {
    private readonly articleModel;
    constructor(articleModel: Model<Article>);
    insertArticle(title: string, authors: string[], source: string, year: number, doi: string, summary: string, claim: string, evidence_level: string, se_methods: string, moderated: boolean, analysed: boolean): Promise<import("mongoose").Document<unknown, {}, Article> & Article & Required<{
        _id: string;
    }>>;
    getUser(doi: string): Promise<import("mongoose").Document<unknown, {}, Article> & Article & Required<{
        _id: string;
    }>>;
    findAll(): Promise<Article[]>;
}
