(function () {
    angular
        .module('TexApp')
        .controller("UpdateOrderStatusController", UpdateOrderStatusController)


    function UpdateOrderStatusController($routeParams, $location, OrderService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.companyId = $routeParams["wid"];
        vm.orderId = $routeParams["pid"];
        vm.back = back;
        vm.profile = profile;
        vm.clear = clear;
        vm.UpdateOrderStatus = UpdateOrderStatus;

        function init() {

            OrderService
                .findOrderById(vm.orderId)
                .then(function (response) {
                    vm.order = response.data;
                });
        }


        init();

        function UpdateOrderStatus(order) {
            OrderService
                .updateOrder(vm.orderId, order)
                .then(function (response) {
                    var updateStats = response.status;
                    if (updateStats) {
                        $location.url("/user/" + vm.userId + "/company/" + vm.companyId + "/order");
                    } else {
                        vm.error = "Unable to update order";
                    }
                })
                .catch(function (response) {
                    vm.error = "Unable to update order";
                });
        }

        function back() {
            $location.url("/user/" + vm.userId + "/company/" + vm.companyId + "/order");
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }

})();