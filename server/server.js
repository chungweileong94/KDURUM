const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
const authRoute = require("./routes/auth-route");
const homeRoute = require("./routes/home-route");
const coursesRoute = require("./routes/courses-route");
const usersRoute = require("./routes/users-route");
const forumRoute = require("./routes/forum-route");

const PORT = process.env.PORT || process.env.port || 8888;

//connect to database
mongoose.connect(keys.mongodb.databaseUri, (err) => {
    if (err) throw err;
    console.log("Connected to database");
});

let app = express();
app.use("/dist", express.static(path.join(__dirname, "../client/dist")));

app.set("views", path.join(__dirname, "../client/views"));

//setup parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup cookie session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //expire in 1 day
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//setup route
app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/courses", coursesRoute);
app.use("/users", usersRoute);
app.use("/forum", forumRoute);

//test
const User = require("./models/user-model");
app.get("/test/:no", (req, res) => {
    if (req.user) {
        User.findOne({ _id: req.user._id }, (err, user) => {
            user.role = req.params.no;
            user.save((err, result) => {
                if (err) throw err;
                res.send("OK");
            });
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
    console.log(`Navigate to http://localhost:${PORT}/`);
});