const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentScheme = new Schema({
    content: String
});

const forumScheme = new Schema({
    title: String,
    desc: String,
    courseId: String,
    comments: [commentScheme]
});

const Forum = mongoose.model("forum", forumScheme);

module.exports = Forum;