const router = require("express").Router();
const Forum = require("./../models/forum-model");

//get all forum with course ID
router.get("/all/:id", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(404);

    let courseId = req.params.id;

    Forum.find({ courseId: courseId }, (err, data) => {
        if (err) throw err;

        res.status(200).json(data);
    });
});

//add new forum
router.post("/add", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.body) return res.sendStatus(404);

    let newForum = req.body;

    new Forum({
        title: newForum.title,
        desc: newForum.desc,
        courseId: newForum.courseId
    }).save((err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

module.exports = router;