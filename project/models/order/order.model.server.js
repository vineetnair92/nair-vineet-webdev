module.exports = function (db_assignment,mongoose) {

//    var mongoose = require("mongoose");
    var OrderSchema = require("./order.schema.server.js")(mongoose);
    var Order = mongoose.model("Order", OrderSchema);
    var api = {
        createOrder: createOrder,
        findAllOrdersForCompany: findAllOrdersForCompany,
        findOrderById: findOrderById,
        updateOrder: updateOrder,
        deleteOrder: deleteOrder
    };
    return api;


    function createOrder(order) {
        console.log("Create order in model");
        return Order.create(order);
    }

    function findAllOrdersForCompany(companyId) {
        return Order.find({_company: companyId});
    }

    function findOrderById(orderId) {
        return Order.findById({_id: orderId});
    }

    function updateOrder(orderId, order) {
        return Order.update({_id: orderId},
            {
                $set: {
                    _company: order._company,
                    SlNo: order.SlNo,
                    description: order.description,
                    orderstatus:order.orderstatus
                }
            });
    }


    function deleteOrder(orderId) {

        return Order.remove({_id: orderId})

    }
}