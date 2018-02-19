const router = require("express").Router();
const path = require("path");

//auth check middleware
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect("/auth/login");
    } else {
        next();
    }
}

//home
router.get("/", authCheck, (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/index.html"));
});

module.exports = router;