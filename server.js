const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
const authRoute = require("./routes/auth-route");
const homeRoute = require("./routes/home-route");

const PORT = process.env.PORT || process.env.port || 8888;

//connect to database
mongoose.connect(keys.mongodb.databaseUri, () => {
    console.log("Connected to database");
});

let app = express();

app.use(express.static("./public"));

//setup view engine
app.set("views", path.join(__dirname, "/public/views"))
app.set("view engine", "ejs");

//setup cookie session
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //expire in 1 day
    keys: [keys.session.cookieKey]
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//setup route
app.use("/", homeRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
    console.log(`Navigate to http://localhost:${PORT}/`);
});