import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    authors: {
      type: [String],
      required: true
    },

    source: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    doi: {
      type: String,
      required: true,
    },
    summary: {
      type: String,

      required: true
    },
    claim: {
      type: String,
      required: false
    },
    evidence_level: {
      type: String,
      required: false
    },
    se_methods: {
      type: String,
      required: false
    },
    moderated: {
      type: String,
      default: false,
      required: false,
    },
    analysed: {
      type: String,
      default: false,
      require: false,
    }


}, { timestamps: true });

// User interface
export interface Article extends mongoose.Document {
    _id: string;
    title: string;
    authors: string[];
    source: string;
    year: number;
    doi: string;
    summary: string;
    claim: string;
    evidence_level: string;
    se_methods: string;
    moderated: string;
    analysed: string;
}

