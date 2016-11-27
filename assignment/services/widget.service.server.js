module.exports = function (app, models) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/assignment/upload' });


    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.put('/api/page/:pid/widget', sortWidgets);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    var widgetModel= models.widgetModel;


    function createWidget(req, res) {
        var pid = req.params.pid;
        var widget = req.body;
        widgetModel
            .createWidget(pid, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.status(400).send(error);
            });
    }


    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        widgetModel
            .findAllWidgetsForPage(pid)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.status(404).send(error);
            });
    }


    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        widgetModel
            .findWidgetById(wgid)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.status(404).send(error);
            });
    }


    function updateWidget(req, res) {
        var wgid = req.params.wgid;
        var widget = req.body;
        widgetModel
            .updateWidget(wgid, widget)
            .then(function (widget) {
                res.sendStatus(200);
            }, function (error) {
                res.status(400).send(error);
            });
    }


    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        widgetModel
            .deleteWidget(wgid)
            .then(function (widget) {
                res.sendStatus(200);
            }, function (error) {
                res.send(400).send(error);
            });
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var myFile = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId= req.body.pageId;
        var filename = myFile.filename;

        var widget = {
            url: "/assignment/upload/"+filename,
        };

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (status) {
                res.redirect("/assignment/#/user"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }


    function sortWidgets(req, res) {
        var pageId = req.params['pid'];
        var start = req.query['start'];
        var end = req.query['end'];

        widgetModel
            .sortWidget(pageId, start, end)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }



};