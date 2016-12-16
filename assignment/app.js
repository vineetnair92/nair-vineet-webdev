/**
 * Created by Vineet Nair on 11/5/2016.
 */
module.exports = function(app, db, mongoose, userModel) {
   // var models = require("./model/models.server")();
    var models = {
        //userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./model/website/website.model.server")(db,mongoose),
        pageModel: require("./model/page/page.model.server")(db,mongoose),
        widgetModel: require("./model/widget/widget.model.server")(db,mongoose)
    }

    require("./services/user.service.server.js")(app, models,userModel);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);
};