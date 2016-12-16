(function () {
    angular
        .module('TexApp')
        .controller("LocationController",LocationController)


    function LocationController($routeParams, OrderService, CompanyListService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.company = $routeParams["cid"];
    init();
    function init(){

    }

    }

}
)();