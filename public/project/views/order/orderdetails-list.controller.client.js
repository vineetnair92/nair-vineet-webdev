(function () {
    angular
        .module('TexApp')
        .controller("OrderDetailsListController", OrderDetailsListController)


    function OrderDetailsListController($routeParams, OrderDetailsService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.companyId = $routeParams["wid"];
        vm.orderId = $routeParams["pid"];
        vm.back = back;
        vm.profile = profile;
        vm.clear = clear;

        function init() {

            OrderDetailsService
                .findOrdersDetailsByOrderId(vm.orderId)
                .then(function (response) {
                    vm.orders = response.data;
                }, function (error) {
                    vm.alert = "Unable to find order details for order";
                });
        }

        init();

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