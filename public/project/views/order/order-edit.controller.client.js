(function () {
    angular
        .module("TexApp")
        .controller("EditOrderController", EditOrderController)
//        .controller('DropDownController', ['$scope', function($scope) {
//        $scope.data = {
//            singleSelect: null,
//        };
//        }])
    ;


    function EditOrderController($location, $routeParams, OrderService) {
        console.log("In edit order");
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.companyId = $routeParams.wid;
        cModel.orderId = $routeParams.pid;
        cModel.updateOrder = updateOrder;
        cModel.deleteOrder = deleteOrder;
        init();

        function init() {
            OrderService
                .findOrderById(cModel.orderId)
                .then(function (response) {
                    cModel.order = response.data;
                });
        }

        function updateOrder(order) {
            OrderService
                .updateOrder(cModel.orderId, order)
                .then(function (response) {
                    var updateStats = response.status;
                    if (updateStats) {
                        $location.url("/user/" + cModel.userId + "/company/" + cModel.companyId + "/order");
                    } else {
                        cModel.error = "Unable to update order";
                    }
                })
                .catch(function (response) {
                    cModel.error = "Unable to update order";
                });
        }

        function deleteOrder(orderId) {
            OrderService
                .deleteOrder(orderId)
                .then(function (response) {
                    var result = response.status;
                    if (result == 200) {
                        $location.url("/user/" + cModel.userId + "/company/" + cModel.companyId + "/order");
                    } else {
                        cModel.error = "Unable to delete order";
                    }
                })
                .catch(function (response) {
                    cModel.error = "Unable to delete order";
                });

        }
    }
})();