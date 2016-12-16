/**
 * Created by Vineet Nair on 11/18/2016.
 */
module.exports = function () {

  /*  var mongoose = require("mongoose");
    var connectionString = 'mongodb://127.0.0.1:27017/dbWAM';

    if (process.env.WEB_CONCURRENCY) {
        connectionString = process.env.MONGODB_URI;
    }

    mongoose.connect(connectionString);
*/
    var models = {
        //userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    }

    return models;
}