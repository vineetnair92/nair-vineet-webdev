/**
 * Created by Vineet Nair on 11/5/2016.
 */
module.exports = function (app, models) {

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    var pageModel= models.pageModel;

    function createPage(req, res) {
        var page = req.body;
        var webId = req.params.wid;
        pageModel
            .createPage(webId,page)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.status(400).send(error);
            });
    }


    function findAllPagesForWebsite(req, res) {
        var wid = req.params.wid;
        pageModel
            .findAllPagesForWebsite(wid)
            .then(function (pages) {
                res.json(pages);
            }, function (error) {
                res.status(404).send(error);
            });
    }


    function findPageById(req, res) {
        var pid = req.params.pid;
        pageModel
            .findPageById(pid)
            .then(function (pages) {
                res.json(pages);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;
        pageModel
            .updatePage(pid,page)
            .then(function (response) {
                res.send(response);
            }, function (error) {
                res.status(400).send(error);
            });
    }



    function deletePage(req, res) {
        var pid = req.params.pid;
        pageModel
            .deletePage(pid,page)
            .then(function (response) {
                res.send(response);
            }, function (error) {
                res.status(400).send(error);
            });
    }

};