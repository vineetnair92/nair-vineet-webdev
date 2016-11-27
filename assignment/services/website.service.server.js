module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userId = req.params.uid;
        websiteModel
            .createWebsiteForUser(userId,newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.uid;
        websiteModel
            .findAllWebsitesForUser(uid)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.status(404).send(error);
            });
    }


    function findWebsiteById(req, res) {
        var websiteId = req.params['wid'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['wid'];
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send(error);
            });
    }



    function deleteWebsite(req, res) {
        var websiteId = req.params['wid'];
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.status(400).send(error);;
            });
    }


};