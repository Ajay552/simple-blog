const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema the structure of the document
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

// model used to interact with the database
// first argument should be singular of the collection blogs
// model must start with caps
const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;