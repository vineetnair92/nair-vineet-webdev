(function () {
    angular
        .module("TexApp")
        .controller("ModifyOrderController", ModifyOrderController);

    var orderOrdersUpdateError = "Error updating orders references in company";

    function ModifyOrderController($location, $routeParams, OrderDetailsService, OrderService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.companyId = $routeParams.wid;
        cModel.orderId = $routeParams.pid;
        cModel.CreateOrderdetails = CreateOrderdetails;
        cModel.back=back;
        cModel.profile = profile;
        cModel.clear = clear;

        init();

        function init() {
            OrderService
                .findOrderById(cModel.orderId)
                .then(function (response) {
                    cModel.order = response.data;
                });
        }


        function CreateOrderdetails(orderdetails) {
            OrderDetailsService
                .createOrderDetails(cModel.orderId, orderdetails)
                .then(function (response) {
                    var orderdetails = response.data;
                    if (orderdetails) {
                        var _orderdetailsId = orderdetails._id;
                        updateOrderReferencesInWebsite(_orderdetailsId);
                    } else {
                        cModel.error = "Unable to create order";
                    }
                })
                .catch(function (error) {
                    cModel.error = "Something went wrong!!"
                })
        }


        function updateOrderReferencesInWebsite(orderdetailsId) {
            OrderService
                .findOrderById(cModel.orderId)
                .then(function (response) {
                    var order = response.data;
                    if (order) {
                        order.orders.push(orderdetailsId);
                        OrderService
                            .updateOrder(cModel.orderId, order)
                            .then(function (response) {
                                if (response.status === 200) {
                                    $location.url("/user/" + cModel.userId + "/company/" + cModel.companyId + "/order");
                                }
                                else {
                                    cModel.error = orderOrdersUpdateError;
                                }
                            })
                            .catch(function (error) {
                                cModel.error = orderOrdersUpdateError;
                            });

                    }
                    else {
                        cModel.error = orderOrdersUpdateError;
                    }
                })
                .catch(function (error) {
                    cModel.error = orderOrdersUpdateError;
                });
        }


        function back() {
            $location.url("/user/" + cModel.userId + "/company/" + cModel.companyId + "/order/");
        }

        function profile() {
            $location.url("/user/" + cModel.userId);
        }


        function clear() {
            cModel.success = "";
            cModel.alert = "";
        }
    }
})();