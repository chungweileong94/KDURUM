const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumScheme = new Schema({
    title: String,
    desc: String,
    createDateTime: Date,
    courseId: String,
    owner: { type: Schema.Types.ObjectId, ref: "user" }
});

const Forum = mongoose.model("forum", forumScheme);

module.exports = Forum;