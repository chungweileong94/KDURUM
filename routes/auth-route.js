const router = require("express").Router();
const passport = require("passport");


router.get("/login",
    (req, res, next) => {
        if (req.user) {
            res.redirect("/");
        } else {
            next();
        }
    }, (req, res) => {
        res.render("login");
    }
);

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