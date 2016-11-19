/**
 * Created by Vineet Nair on 11/5/2016.
 */
module.exports = function (app, models) {

    var pages = [
        { _id: "321", name: "Post 1", websiteId: "456" },
        { _id: "432", name: "Post 2", websiteId: "456" },
        { _id: "543", name: "Post 3", websiteId: "456" }
    ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var websiteId = req.params.wid;
        var page = req.body;
        var newPage = {
            _id: (new Date()).getTime() + "",
            name: page.name,
            title: page.title,
            websiteId: websiteId
        };
        pages.push(newPage);
        if (newPage) {
            res.json(newPage);
            return;
        }
        res.sendStatus(400);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        var result = [];
        for (var p in pages) {
            if (pages[p].websiteId === websiteId) {
                result.push(pages[p]);
            }
        }
        if (result) {
            res.json(result);
            return;
        }
        res.sendStatus(404);
    }

    function findPageById(req, res) {
        var pid = req.params.pid;
        for (var p in pages) {
            if (pages[p]._id === pid) {
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;
        for (var p in pages) {
            if (pages[p]._id === pid) {
                if (page.name)
                pages[p].name = page.name;
                if (page.title)
                pages[p].title = page.title;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deletePage(req, res) {
        var pid = req.params.pid;
        for (var p in pages) {
            if (pages[p]._id === pid) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

};