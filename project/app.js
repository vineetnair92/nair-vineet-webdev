module.exports = function (app, db, mongoose, userModel) {

    var models = {
        companyModel: require("./models/company/company.model.server")(db,mongoose),
        orderModel: require("./models/order/order.model.server")(db,mongoose),
        orderdetailsModel: require("./models/orderdetails/orderdetails.model.server")(db,mongoose),
        companyListModel: require("./models/companyList/companyList.models.server")(db,mongoose)
    }

    require("./services/user.service.server.js")(app, models,userModel);
    require("./services/company.service.server.js")(app, models,userModel);
    require("./services/order.service.server.js")(app, models);
    require("./services/orderdetails.service.server.js")(app, models);
    require("./services/companylist.service.server.js")(app, models);
};