const router = require("express").Router();
const path = require("path");
const passport = require("passport");
const User = require("./../models/user-model");

//get user data
router.get("/user", (req, res) => {
    if (req.user) {
        User.findOne({_id: req.user})
            .deepPopulate(["enrollment", "favorites", "enrollment.lecturer", "favorites.lecturer"])
            .exec((err, data) => {
                return res.json(data);
            });
    } else {
        return null;
    }
});

//check
router.get("/check", (req, res) => {
    if (!req.user) {
        res.json(false);
    } else {
        res.json(true);
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
        res.redirect("/login.html");
        //res.sendFile(path.join(__dirname, "../../client/dist/login.html"));
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