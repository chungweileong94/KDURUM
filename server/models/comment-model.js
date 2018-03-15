const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    timeStamp: Date,
    value: String
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;