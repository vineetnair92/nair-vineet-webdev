/**
 * Created by Vineet Nair on 11/5/2016.
 */
module.exports = function(app) {
    var users = [
        {username: 'alice', password: 'ewq', _id: 123, first: 'Alice', last: 'Wonderland'},
        {username: 'bob', password: 'ewq', _id: 234, first: 'Bob', last: 'Dylan'},
        {username: 'charlie', password: 'ewq', _id: 345, first: 'Charlie', last: 'Brown'}
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', unregisterUser);

    function unregisterUser(req, res) {
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                users.splice(u, 1);
            }
        }
        res.sendStatus(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                if (user.first)
                users[i].first = user.first;
                if (user.last)
                users[i].last = user.last;
                if (user.email)
                users[i].email = user.email;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function createUser(req, res) {
        var user = req.body;
        var newUser = {
            _id: (new Date()).getTime() + "",
            username: user.username,
            password: user.password,
            first: user.first,
            last: user.last
        };
        users.push(user);
        if (newUser) {
            res.send(newUser);
            return;
        }
        res.sendStatus(400);
    }


    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users) {
            if(users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }


    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }


    function findUserById(req, res) {
        var userId = parseInt(req.params.uid);
        for(var u in users) {
            if(users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }
};