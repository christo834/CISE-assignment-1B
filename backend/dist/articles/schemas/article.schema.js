"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleSchema = void 0;
const mongoose = require("mongoose");
exports.ArticleSchema = new mongoose.Schema({
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
        type: Boolean,
        required: false
    },
    analysed: {
        type: Boolean,
        required: false
    }

}, { timestamps: true });
//# sourceMappingURL=article.schema.js.map