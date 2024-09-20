const mongoose = require('mongoose');

const Blogschema = new mongoose.Schema({
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    title: {type: String, required: true, default:'title'},
    content: {type: String, require: true, default:'content'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const Blog = mongoose.model('blogs', Blogschema);

module.exports = Blog;