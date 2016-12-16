module.exports = function (app,projectUserModel) {
    var passport = require("passport");
    var LocalStrategy = require("passport-local").Strategy;
    var bcrypt = require('bcrypt-nodejs');

    var FacebookStrategy = require('passport-facebook').Strategy;
    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };

    //Secure authentication

    app.get("/auth/facebook", passport.authenticate('facebook', {scope: 'email'}));
    app.get("/auth/facebook/callback",
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
     }));


    app.post("/api/login",passport.authenticate('project'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', projectRegister);
    app.get('/api/isLoggedIn', loggedIn);


    passport.use('project', new LocalStrategy(projectLocalStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    function projectLocalStrategy(username, password, done) {
        projectUserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        var newObj = JSON.parse(JSON.stringify(user));
                        done(null, newObj);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
                );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        projectUserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }


    function loggedIn(req, res) {
        res.send(req.isAuthenticated()? req.user : '0');
    }


    function facebookStrategy(token, refreshToken, profile, done) {
        assignUserModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = {
                        username: profile.displayName.replace(/ /g, ""),
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    assignUserModel
                        .createUser(newUser)
                        .then(function (user) {
                            return done(null, user);
                        }, function (err) {
                            console.log(err);
                            return done(err, null);
                        });
                }
            }, function (err) {
                console.log(err);
                return done(err, null);
            });
    }


    function projectRegister(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        projectUserModel
            .createUser(newUser)
            .then(function (user) {
                req.login(user, function (err) {
                    if(!err){
                        res.json(user);
                    }
                    else {
                        res.status(400).send(err);
                    }
                })

            })
            .catch(function (error) {
                res.status(400).send();
            });
    }
};