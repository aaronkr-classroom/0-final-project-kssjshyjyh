"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    subtitle: {
        type: String,
        required: true,
        trim: true,
    },
    authors: {
        type: String,
        required: true,
        trim: true,
    },
    publisher: {
        type: String,
        trim: true,
    },
    BookImg: {
        type: String,
        trim: true,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true, // timestamps 속성을 추가해 createdAt 및 updatedAt 시간 기록
  }
);

module.exports = mongoose.model("Book", BookSchema);