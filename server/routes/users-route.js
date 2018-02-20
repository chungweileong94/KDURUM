const router = require("express").Router();
const User = require("./../models/user-model");

router.get("/all", (req, res) => {
    if (!req.user || req.user.role != 0) return res.sendStatus(401);

    User.find({}, (err, users) => {
        if (err) throw err;

        res.status(200).json(users);
    })
});

router.delete("/delete/:id", (req, res) => {
    if (!req.params.id) return res.sendStatus(404);
    let id = req.params.id;
    if (!req.user || (req.user.role != 0 && req.user._id != id)) return res.sendStatus(401);

    User.findByIdAndRemove(id, (err, user) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

module.exports = router;