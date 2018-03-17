const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const User = require("../models/user-model");
const keys = require("./keys");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new FacebookStrategy({
        clientID: keys.facebook.clientId,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["displayName", "email", "gender", "picture"]
    }, (accessToken, refreshToken, profile, cb) => {
        //console.log(profile);
        User.findOne({ facebookId: profile.id })
            .then((currentUser) => {
                if (currentUser) {
                    //already have the user
                    console.log(`User is: ${currentUser}`);
                    cb(null, currentUser);
                } else {
                    //if not, create user in database
                    new User({
                        name: profile.displayName,
                        facebookId: profile.id,
                        gender: profile.gender,
                        email: profile._json.email,
                        thumnail: profile._json.picture.data.url,
                        role: 2,
                        favorites: [],
                        enrollment: []
                    }).save().then((newUser) => {
                        console.log(`New user created: ${newUser}`);
                        cb(null, newUser);
                    });
                }
            });
    })
);