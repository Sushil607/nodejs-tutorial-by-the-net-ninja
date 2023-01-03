const mongoose = require("mongoose");

// getting a schema object
const Schema = mongoose.Schema;
// create a new instance of schema object
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create a model based on above Schema
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
