const mongoose = require("mongoose");
const deepPopulate = require("mongoose-deep-populate")(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    facebookId: String,
    gender: String,
    email: String,
    thumnail: String,
    role: Number, //0: admin, 1: lecture, 2: student
    favorites: [{ type: Schema.Types.ObjectId, ref: "course" }],
    enrollment: [{ type: Schema.Types.ObjectId, ref: "course" }]
});

userSchema.plugin(deepPopulate);

const User = mongoose.model("user", userSchema);

module.exports = User;