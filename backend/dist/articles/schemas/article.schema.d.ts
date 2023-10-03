import * as mongoose from 'mongoose';
export declare const ArticleSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    authors: string[];
    source: string;
    year: number;
    doi: string;
    summary: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    authors: string[];
    source: string;
    year: number;
    doi: string;
    summary: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    authors: string[];
    source: string;
    year: number;
    doi: string;
    summary: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface Article extends mongoose.Document {
    _id: string;
    title: string;
    authors: string;
    source: string;
    year: number;
    doi: string;
    summary: string;
}
