const router = require("express").Router();
const Course = require("./../models/course-model");

router.get("/all", (req, res) => {
    if (!req.user) return res.sendStatus(401);

    Course.find({}, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }

        res.status(200).json(data);
    });
});

router.post("/add", (req, res) => {
    if (!req.user || req.user.role != 0) return res.sendStatus(401);
    if (!req.body) return res.sendStatus(404);

    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;