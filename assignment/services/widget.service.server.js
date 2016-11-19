module.exports = function (app, models) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/assignment/upload' });


    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "index": 0},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "index": 1},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "index": 2},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>',"index": 3},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "index": 4},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E","index": 5 },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "index": 6}
    ];

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.put('/api/page/:pid/widget', sortWidgets);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);



    function createWidget(req, res) {
        var pid = req.params.pid;
        var widget = req.body;
        var newWidget = {
            "_id": (new Date()).getTime() + "",
            "widgetType": widget.widgetType,
            "pageId": pid,
            "size": 1,
            "text": "",
            "url": "",
            "width": "100%",
            "index": widgets.length
        };
        widgets.push(newWidget);
        if (newWidget) {
            res.json(newWidget);
            return;
        }
        res.sendStatus(400);
    }

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        var result = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pid) {
                result.push(widgets[w]);
            }
        }
        if (result) {
            res.json(result);
            return;
        }
        res.sendStatus(404);
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                res.json(widgets[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var wgid = req.params.wgid;
        var widget = req.body;
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                if (widget.size)
                    widgets[w].size = widget.size;
                if (widget.text)
                    widgets[w].text = widget.text;
                if (widget.url)
                    widgets[w].url = widget.url;
                if (widget.width)
                    widgets[w].width = widget.width;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        for (var w in widgets) {
            if (widgets[w]._id === wgid) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;

        var originalname = myFile.originalname;
        var filename = myFile.filename;
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = "/assignment/upload/"+filename;
                widgets[i].width = width;
                var pageId = widgets[i].pageId;
                res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            }
        }
    }


    function sortWidgets(req, res) {
        var pageId = req.params.pid;
        var initial = req.query.initial;
        var final = req.query.final;
        var pos1  = retrievePos(pageId,initial);
        var pos2 = retrievePos(pageId,final);
        widgets.splice(pos2, 0, widgets.splice(pos1, 1)[0]);
        res.sendStatus(200);
    }

    function retrievePos(pageId,pos){
        var res = [];
        for(var i=0;i<widgets.length;i++) {
            if(pageId == widgets[i].pageId){
                res.push(i);
            }
        }
        return res[pos];
    }



};