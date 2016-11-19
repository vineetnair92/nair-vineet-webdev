/**
 * Created by Vineet Nair on 11/5/2016.
 */
module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);


    function createUser(req, res) {
        var newUser = req.body;
            userModel
                .createUser(newUser)
                .then(function (user) {
                    res.json(user);
                }, function (error) {
                    res.statusCode(400).send(error);
                });
    }


    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        }
        else if(query.username) {
            findUserByUsername(req, res);
        }
    }


    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
               res.json(user);
            }, function (error) {
                res.statusCode(404).send(error);
            });
    }


    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.statusCode(400).send(error)
            });
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.statusCode(404).send(error);
            });
    }


    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        userModel
            .updateUser(user,uid)
            .then(function (user) {
                res.sendStatus(200);
            }, function (error) {
                res.statusCode(404).send(error);
            });
    }


    function deleteUser(req, res) {
        var uid = req.params.uid;
        userModel
            .deleteUser(userId)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.statusCode(400).send(error);
            });
    }
};