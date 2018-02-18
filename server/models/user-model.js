const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    facebookId: String,
    gender: String,
    email: String,
    thumnail: String,
    role: Number, //0: admin, 1: lecture, 2: student
    enrollment: [String]
});

const User = mongoose.model("user", userSchema);

module.exports = User;