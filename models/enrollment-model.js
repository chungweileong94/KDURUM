const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    userId: String,
    courseId: String
});

const Enrollment = mongoose.model("enrollment", enrollmentSchema);

module.exports = Enrollment;