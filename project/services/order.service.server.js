module.exports = function (app, models) {

    var orderModel = models.orderModel;
    var companyModel = models.companyModel;
    app.post("/api/company/:companyId/order", createOrder);
    app.get("/api/company/:companyId/order", findAllOrdersForCompany);
    app.get("/api/order/:orderId", findOrderById);
    app.put("/api/order/:orderId", updateOrder);
    app.delete("/api/order/:orderId", deleteOrder);

    function createOrder(req, res) {
        var newOrder = req.body;
        orderModel
            .createOrder(newOrder)
            .then(function (order) {
                res.json(order);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function findAllOrdersForCompany(req, res) {
        var companyId = req.params.companyId;
        orderModel
            .findAllOrdersForCompany(companyId)
            .then(function (orders) {
                res.json(orders);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });

    }

    function findOrderById(req, res) {
        var orderId = req.params.orderId;
        orderModel
            .findOrderById(orderId)
            .then(function (order) {
                res.json(order);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function updateOrder(req, res) {
        var order = req.body;
        var orderId = req.params.orderId;
        delete order._id;
        orderModel
            .updateOrder(orderId, order)
            .then(function (response) {
                res.send(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            })

    }

    function deleteOrder(req, res) {
        var orderId = req.params.orderId;
        orderModel
            .findOrderById(orderId)
            .then(function (order) {
                orderModel
                    .deleteOrder(orderId)
                    .then(function (response) {
                        companyModel
                            .deleteOrderForCompany(order._company, orderId)
                            .then(function (response) {
                                res.send(response);
                            })
                            .catch(function (error) {
                                res.status(400).send(error);
                            })

                    })
                    .catch(function (error) {
                        res.status(400).send(error);
                    });
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }
};