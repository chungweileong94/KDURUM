const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    Title: String
});

const Course = mongoose.model("course", courseSchema);

module.exports = Course;