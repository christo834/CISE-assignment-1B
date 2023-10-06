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
    claim?: string;
    evidence_level?: string[];
    se_methods?: string[];
    moderated?: boolean;
    analysed?: boolean;
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
    claim?: string;
    evidence_level?: string[];
    se_methods?: string[];
    moderated?: boolean;
    analysed?: boolean;
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
    claim?: string;
    evidence_level?: string[];
    se_methods?: string[];
    moderated?: boolean;
    analysed?: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface Article extends mongoose.Document {
    _id: string;
    title: string;
    authors: string[];
    source: string;
    year: number;
    doi: string;
    summary: string;
    claim: string;
    evidence_level: string[];
    se_methods: string[];
    moderated: boolean;
    analysed: boolean;
}
