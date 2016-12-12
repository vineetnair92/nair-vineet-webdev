module.exports = function (app, models) {

    var orderdetailsModel = models.orderdetailsModel;
    app.post("/api/order/:pid/orderdetails", createOrderdetails);
    app.get("/api/order/:pid/orderdetails", findAllOrderdetailsForOrder);
    app.get("/api/orderdetails/:orderdetailsId", findOrderdetailsById);

    function createOrderdetails(req, res) {
        var newOrderdetails = req.body;
        orderdetailsModel
            .createorderdetails(newOrderdetails)
            .then(function (orderdetails) {
                res.json(orderdetails);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function findAllOrderdetailsForOrder(req, res) {
        var orderId = req.params.pid;
        orderdetailsModel
            .findAllOrderdetailsforOrder(orderId)
            .then(function (orderdetails) {
                res.json(orderdetails);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });

    }

    function findOrderdetailsById(req, res) {
        var orderdetailsId = req.params.orderdetailsId;
        orderdetailsModel
            .findOrderdetailsbyId(orderdetailsId)
            .then(function (orderdetails) {
                res.json(orderdetails);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

};