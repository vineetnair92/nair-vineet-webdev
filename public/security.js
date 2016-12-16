module.exports = function (app, /*assignUserModel,*/ projectUserModel) {
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
//    app.post("/api/login", passport.authenticate('assign'), login);
//    app.post("/api/logout", logout);
//    app.post("/api/register",assignRegister,passport.authenticate('assign'), login);
//    app.get("/api/loggedin", loggedIn);

 //   app.get("/auth/facebook", passport.authenticate('facebook', {scope: 'email'}));
 //   app.get("/auth/facebook/callback",
 //      passport.authenticate('facebook', {
 //         successRedirect: '/assignment/#/user',
  //       failureRedirect: '/assignment/#/login'
 //    }));


    app.post("/api/login",passport.authenticate('project'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', projectRegister);
    app.get('/api/isLoggedIn', loggedIn);


   // passport.use('assign', new LocalStrategy(assignLocalStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
   // passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    function assignLocalStrategy(username, password, done) {
        console.log("Local Strategy");
        assignUserModel
         .findUserByCredentials(username, password)
         .then(function (user) {
             if (user && bcrypt.compareSync(password, user.password))  {
                 console.log("Password check");

                 var newObj = JSON.parse(JSON.stringify(user));
                 newObj.type = 'assign';
                 return done(null, newObj);
             }
             else {
               //  console.log("Local Strategy");
                 return done(null, false);
             }
         },
             function (err) {
             if (err) {
                 return done(err);
             }
         });
    }


    function projectLocalStrategy(username, password, done) {
        projectUserModel
            .findUserByUsername(username)
            .then(
                function (user) {
             //       console.log("Local Strategy "+ user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        var newObj = JSON.parse(JSON.stringify(user));
     //                   newObj.type = 'project';
                        done(null, newObj);
                    } else {
           //             console.log("Local Strategy");
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
       /* if (user.type == 'assign') {
            assignUserModel
                .findUserById(user._id)
                .then(function (user) {
                    done(null, user);
                },
                    function (err) {
                    done(err, null);
                });
        }
        else if (user.type == 'project') {
         */   projectUserModel
                .findUserById(user._id)
                .then(
                    function(user){
      //                  console.log("Get ID");
                        done(null, user);
                    },
                    function(err){
    //                    console.log("No ID");
                        done(err, null);
                    }
                );
        }
    //}

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function assignRegister(req, res,next) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        assignUserModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            next();
//                            res.json(user);
                        }
                    });
                }
            });
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
  //                      console.log("HI" + user);
 //                       next();
                        res.json(user);
                    }
                    else {
//                        console.log("NOT REG")
                        res.status(400).send(err);
                    }
                })

            })
            .catch(function (error) {
                res.status(400).send();
            });
    }
};