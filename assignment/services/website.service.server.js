module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.uid;
        var newWebsite = {
            "_id": (new Date()).getTime() + "",
            "name": website.name,
            "description": website.description,
            "developerId": userId
        };
        websites.push(newWebsite);
        if (newWebsite) {
            res.json(newWebsite);
            return;
        }
        res.sendStatus(400);
    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.uid;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId === uid) {
                result.push(websites[w]);
            }
        }
        if (result) {
            res.json(result);
            return;
        }
        res.sendStatus(404);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['wid'];
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                res.json(websites[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['wid'];
        var website = req.body;
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                if (website.name)
                websites[w].name = website.name;
                if (website.description)
                websites[w].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }


    function deleteWebsite(req, res) {
        var websiteId = req.params['wid'];
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(w, 1);
            }
        }
        res.sendStatus(200);
    }


};