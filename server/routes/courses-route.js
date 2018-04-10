const router = require("express").Router();
const Course = require("./../models/course-model");
const User = require("./../models/user-model");
const Forum = require("./../models/forum-model");
const Comment = require("./../models/comment-model");

//get all courses
router.get("/all", (req, res) => {
    if (!req.user) return res.sendStatus(401);

    Course.find({})
        .populate("lecturer")
        .exec((err, data) => {
            if (err) throw err;

            res.status(200).json(data);
        });
});

//get all courses for lecture
router.get("/all/lecture/:lectureId", (req, res) => {
    if (!req.user || req.user.role != 1) return res.sendStatus(401);
    if (!req.params.lectureId) return res.sendStatus(500);

    Course.find({ lecturer: req.params.lectureId })
        .populate("lecturer")
        .exec((err, courses) => {
            if (err) throw err;

            res.status(200).json(courses);
        });
});

//add course
router.post("/add", (req, res) => {
    if (!req.user || req.user.role != 0) return res.sendStatus(401);
    if (!req.body.title) return res.sendStatus(500);

    new Course({
        title: req.body.title,
        lecturer: (!req.body.lecturerId) ? null : req.body.lecturerId
    }).save((err, result) => {
        if (err) throw err;

        if (req.body.lecturerId) {
            User.findByIdAndUpdate(
                { _id: req.body.lecturerId },
                { $set: { enrollment: [] } },
                (err, user) => {
                    if (err) throw err;
                    return res.sendStatus(200);
                });
        } else {
            return res.sendStatus(200);
        }
    });
});

//update course
router.put("/update", (req, res) => {
    if (!req.user || req.user.role != 0) return res.sendStatus(401);
    if (!req.body.title) return res.sendStatus(500);

    Course.findOneAndUpdate(
        { _id: req.body._id },
        { $set: { title: req.body.title, lecturer: (!req.body.lecturerId) ? null : req.body.lecturerId } },
        (err, doc) => {
            if (err) throw err;

            if (req.body.lecturerId) {
                User.findByIdAndUpdate(
                    { _id: req.body.lecturerId },
                    { $set: { enrollment: [] } },
                    (err, user) => {
                        if (err) throw err;
                        return res.sendStatus(200);
                    });
            } else {
                return res.sendStatus(200);
            }
        });
});

//delete course
router.delete("/delete/:id", (req, res) => {
    if (!req.user || req.user.role != 0) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(404);

    let id = req.params.id;

    Course.findByIdAndRemove(id, (err, course) => {
        if (err) throw err;

        //remove related forums
        Forum.find({ courseId: id }).remove(err_forum => {
            //remove relate comments
            Comment.find({ forumId: id }).remove(err_comments => {
                if (err_comments) throw err_comments;

                //remove related user's enrollment
                User.find({ enrollment: id }, (err_users, users) => {
                    if (err_users) throw err_users;

                    if (users.length == 0) return res.sendStatus(200);

                    users.forEach(user => {
                        //clean enrollment
                        if (user.enrollment.find(c => c == id)) {
                            user.enrollment.splice(user.enrollment.indexOf(id), 1);
                        }

                        //clean favorites
                        if (user.favorites.find(c => c == id)) {
                            user.favorites.splice(user.favorites.indexOf(id), 1);
                        }

                        user.save((err_user, result) => {
                            if (err_user) throw err_user;
                            res.sendStatus(200);
                        });
                    });
                });
            });
        });
    });
});

//join course
router.put("/join/:id", (req, res) => {
    if (!req.user || req.user.role != 2) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(404);

    let courseId = req.params.id;

    User.findOne({ _id: req.user._id }, (err, obj) => {
        if (err) throw err;

        if (!obj.enrollment.find(c => { return c == courseId; })) {
            obj.enrollment.push(courseId);
        }
        obj.save((err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

//leave course
router.put("/leave/:id", (req, res) => {
    if (!req.user || req.user.role != 2) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(404);

    let courseId = req.params.id;

    User.findOne({ _id: req.user._id }, (err, obj) => {
        if (err) throw err;

        obj.enrollment.splice(obj.enrollment.indexOf(courseId), 1);
        if (obj.favorites.find(f => f == courseId)) {
            obj.favorites.splice(obj.favorites.indexOf(courseId), 1);
        }
        obj.save((err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

//mark as favorite
router.put("/favorites/add/:id", (req, res) => {
    if (!req.user || req.user.role != 2) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(404);

    let courseId = req.params.id;

    User.findOne({ _id: req.user._id }, (err, obj) => {
        if (err) throw err;

        if (!obj.favorites.find(c => { return c == courseId; })) {
            obj.favorites.push(courseId);
        }
        obj.save((err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

//remvoe from favorites
router.put("/favorites/remove/:id", (req, res) => {
    if (!req.user || req.user.role != 2) return res.sendStatus(401);
    if (!req.params.id) return res.sendStatus(404);

    let courseId = req.params.id;

    User.findOne({ _id: req.user._id }, (err, obj) => {
        if (err) throw err;

        obj.favorites.splice(obj.favorites.indexOf(courseId), 1);
        obj.save((err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

module.exports = router;