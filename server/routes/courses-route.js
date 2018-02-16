const router = require("express").Router();
const Course = require("./../models/course-model");

router.get("/all", (req, res) => {
    if (!req.user) return res.sendStatus(401);

    Course.find({}, (err, data) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        res.status(200).json(data);
    });
});

router.post("/add", (req, res) => {
    if (!req.user || req.user.role != 0) return res.sendStatus(401);
    if (!req.body.title) return res.sendStatus(404);

    new Course({
        title: req.body.title
    }).save((err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

module.exports = router;