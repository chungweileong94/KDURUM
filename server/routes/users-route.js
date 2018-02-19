const router = require("express").Router();
const User = require("./../models/user-model");

router.get("/all", (req, res) => {
    if (!req.user || req.user.role != 0) return res.sendStatus(401);

    User.find({}, (err, users) => {
        if (err) throw err;

        res.status(200).json(users);
    })
});

module.exports = router;