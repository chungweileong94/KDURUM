const router = require("express").Router();
const Course = require("./../models/course-model");
const User = require("./../models/user-model");
const Comments = require("./../models/comment-model");

//get all comments
router.get("/all", (req, res) => {
    if (!req.user) return res.sendStatus(401);

    Comments.find({}, (err, data) => {
        if (err) throw err;

        res.status(200).json(data);
    });
});

//add comment
router.post("/add", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.body) return res.sendStatus(500);

    new Comments({
        user: req.user._id,
        timeStamp: new Date,
        value: req.body.value
    }).save((err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

module.exports = router;