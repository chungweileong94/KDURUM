const router = require("express").Router();
const Course = require("./../models/course-model");
const User = require("./../models/user-model");

//get all courses
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

//add course
router.post("/add", (req, res) => {
    if (!req.user || req.user.role != 0) return res.sendStatus(401);
    if (!req.body.title) return res.sendStatus(500);

    new Course({
        title: req.body.title
    }).save((err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

//join course
router.put("/join/:id", (req, res) => {
    if (!req.user || req.user.role == 0) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(404);

    let courseId = req.params.id;

    User.findOne({ _id: req.user._id }, (err, obj) => {
        if (err) throw err;

        obj.enrollment.push(courseId);
        obj.save((err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

//leave course
router.put("/leave/:id", (req, res) => {
    if (!req.user || req.user.role == 0) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(404);

    let courseId = req.params.id;

    User.findOne({ _id: req.user._id }, (err, obj) => {
        if (err) throw err;

        obj.enrollment.splice(obj.enrollment.indexOf(courseId), 1);
        obj.save((err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

module.exports = router;