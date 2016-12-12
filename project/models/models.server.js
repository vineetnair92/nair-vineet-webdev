module.exports = function () {


    var mongoose = require("mongoose");

    var connectionString = 'mongodb://localhost/ERP_DB';
//    var connectionString = 'mongodb://heroku_dkjw1m77:2ued38bogvfa0sl5873ahsmc5v@ds037165.mlab.com:37165/heroku_dkjw1m77';

    if (process.env.WEB_CONCURRENCY) {
        connectionString = process.env.MONGODB_URI;
    }


    mongoose.Promise = global.Promise;

    var db_assignment =  mongoose.createConnection(connectionString);


    var models = {
        userModel: require("./user/user.models.server.js")(db_assignment),
        companyModel: require("./company/company.model.server")(db_assignment),
        orderModel: require("./order/order.model.server")(db_assignment),
        orderdetailsModel: require("./orderdetails/orderdetails.model.server")(db_assignment),
        companyListModel: require("./companyList/companyList.models.server")(db_assignment)
    }

    return models;
}