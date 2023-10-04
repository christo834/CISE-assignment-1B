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
      required: true,
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
      required: true,
    },
  },
  { timestamps: true },
);

// User interface
export interface Article extends mongoose.Document {
  _id: string;
  title: string;
  authors: string;
  source: string;
  year: number;
  doi: string;
  summary: string;
}
