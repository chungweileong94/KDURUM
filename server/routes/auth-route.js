const router = require("express").Router();
const path = require("path");
const passport = require("passport");
const User = require("./../models/user-model");

//get user data
router.get("/user", (req, res) => {
    if (req.user) {
        User.findOne({ _id: req.user })
            .deepPopulate(["enrollment", "favorites", "enrollment.lecturer", "favorites.lecturer"])
            .exec((err, data) => {
                return res.json(data);
            });
    } else {
        null;
    }
});

//login
router.get("/login",
    (req, res, next) => {
        if (req.user) {
            res.redirect("/");
        } else {
            next();
        }
    }, (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/views/login.html"));
    }
);

//logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

//auth with facebook
router.get("/facebook", passport.authenticate("facebook", {
    scope: ["email"]
}));

//callback route for facebook for redirect to
router.get("/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        res.redirect("/");
    }
);

module.exports = router;