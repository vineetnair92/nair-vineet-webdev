(function () {
    angular
        .module('TexApp')
        .controller("OrderListController", OrderListController)


    function OrderListController($routeParams, OrderService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.companyId = $routeParams.wid;

        init();

        function init() {

            OrderService
                .findOrderByCompanyId(cModel.companyId)
                .then(function (response) {
                    cModel.orders = response.data;
                });
        }
    }

})();