module.exports = function (app, models, userModel) {

    var auth = authorized;
    app.post("/api/user", auth,createUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user", findUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", auth,deleteUser);


    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function (user) {
                req.login(user, function (err) {
                    if(!err){
                        console.log(req);
                        res.json(user);
                    }
                })

            })
            .catch(function (error) {
                res.status(400).send();
            });
    }

    function findUserById(req, res) {
        var uid = req.params.userId;
        //console.log(req.session);
        userModel
            .findUserById(uid)
            .then(function (user) {
                res.send(user);
            })
            .catch(function (error) {
                res.statusCode(404).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(username, password, req, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.status(400).send();
        }
    }

    function findUserByCredentials(username, password, req, res) {
        console.log(req.session);
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                req.session.user = user;
                res.send(user);
            })
            .catch(function (error) {
                res.status(404).send(error);
            });
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            })
            .catch(function (error) {
                res.status(400).send(error)
            });
    }

    function updateUser(req, res) {
        console.log("whatup");
        var userId = req.params.userId;
        var user = req.body;
        delete user._id;
        userModel
            .updateUser(user, userId)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};