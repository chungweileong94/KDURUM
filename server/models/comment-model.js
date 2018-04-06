const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    forumId: String,
    user: { type: Schema.Types.ObjectId, ref: "user" },
    createDateTime: Date,
    content: String,
    likes: [{ type: Schema.Types.ObjectId, ref: "user" }]
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;