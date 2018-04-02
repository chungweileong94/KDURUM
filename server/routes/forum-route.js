const router = require("express").Router();
const Forum = require("./../models/forum-model");
const Comment = require("./../models/comment-model");

//get all forum with course ID
router.get("/all/:id", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(500);

    let courseId = req.params.id;

    Forum.find({ courseId: courseId })
        .populate("owner")
        .exec((err, forums) => {
            if (err) throw err;
            return res.status(200).json(forums);
        });
});

//add new forum
router.post("/add", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.body) return res.sendStatus(500);

    let newForum = req.body;

    new Forum({
        title: newForum.title,
        desc: newForum.desc,
        createDateTime: Date.now(),
        courseId: newForum.courseId,
        owner: req.user._id
    }).save((err, result) => {
        if (err) throw err;
        return res.sendStatus(200);
    });
});

//update forum
router.put("/update", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.body) return res.sendStatus(500);

    Forum.findById(req.body.id, (err, forum) => {
        if (err) throw err;
        //check privilege
        if (!forum.owner.equals(req.user._id)) {
            if (req.user.role != 0) {
                return res.sendStatus(401);
            }
        }

        forum.title = req.body.title;
        forum.desc = req.body.desc;

        forum.save((err_forum_save, forum_save) => {
            if (err_forum_save) throw err_forum_save;

            return res.sendStatus(200);
        });
    });
});

//remove forum
router.delete("/remove/:id", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(500);

    let id = req.params.id;

    Forum.findById(id, (err, forum) => {
        if (err) throw err;
        //check privilege
        if (!forum.owner.equals(req.user._id)) {
            if (req.user.role != 0) {
                return res.sendStatus(401);
            }
        }

        forum.remove(err_forum => {
            Comment.find({ forumId: id }).remove(err_comments => {
                if (err_comments) throw err_comments;

                return res.sendStatus(200);
            });
        });
    });
});

//add comment
router.post("/comment/add", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.body) return res.sendStatus(500);

    let newComment = req.body;

    new Comment({
        forumId: newComment.forumId,
        user: req.user._id,
        content: newComment.content,
        createDateTime: Date.now()
    }).save((err, result) => {
        if (err) throw err;
        return res.sendStatus(200);
    });
});

//get comments
router.get("/comment/all/:id", (req, res) => {
    if (!req.user) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(500);

    Comment.find({
        forumId: req.params.id
    }).populate("user").exec((err, comments) => {
        if (err) throw err;
        return res.status(200).json(comments);
    });
});

module.exports = router;