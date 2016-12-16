module.exports = function (db_assignment,mongoose) {

//    var mongoose = require("mongoose");
    var OrderdetailsSchema = require("./orderdetails.schema.server.js")(mongoose);
    var Orderdetails = mongoose.model("Orderdetails", OrderdetailsSchema);
    var api = {
        createorderdetails: createorderdetails,
        findAllOrderdetailsforOrder: findAllOrderdetailsforOrder,
        findOrderdetailsbyId: findOrderdetailsbyId
    };
    return api;


    function createorderdetails(order) {
        console.log("Create page in model");
        console.log(order);
        return Orderdetails.create(order);
    }

    function findAllOrderdetailsforOrder(orderId) {
        return Orderdetails.find({_order: orderId});
    }

    function findOrderdetailsbyId(orderId) {
        return Orderdetails.findById({_id: orderId});
    }

}