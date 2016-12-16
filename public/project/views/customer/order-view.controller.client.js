(function () {
    angular
        .module('TexApp')
        .controller("ViewOrderController", ViewOrderController);


    function ViewOrderController($routeParams, OrderService, CompanyListService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.company=$routeParams["cid"];
        vm.clear = clear;

        function init() {
            CompanyListService.findCompanyExists(vm.company)
                .then(function (res){
                    console.log("Company ID from List");
                    console.log(res.data);
                    var id = res.data[0]._web;
                    OrderService
                        .findAllOrdersForCompany(id)
                        .then(function (response) {
                            console.log("HERE ");
                            console.log(response.data);
                            vm.orders = response.data;
                        }, function (error) {
                            vm.alert = "Unable to find orders for company";
                        });
                }, function (error) {
                    vm.alert = "Unable to find orders for company";
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