/**
 * Created by Vineet Nair on 11/5/2016.
 */
module.exports = function(app) {
    var websites = [
        {_id: 321, name: 'facebook.com', uid: 123},
        {_id: 432, name: 'wikipedia.org', uid: 123},
        {_id: 543, name: 'twitter.com', uid: 234}
    ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.uid;
        var newWebsite = {
            _id: (new Date()).getTime() + "",
            name: website.name,
            description: website.description,
            uid: userId
        };
        websites.push(newWebsite);
        if (newWebsite) {
            res.json(newWebsite);
            return;
        }
        res.sendStatus(400);
    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].uid == uid) {
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