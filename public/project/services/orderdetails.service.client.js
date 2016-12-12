(function () {
    angular
        .module("TexApp")
        .factory("OrderDetailsService", OrderDetailsService);

    function OrderDetailsService($http) {
        var api = {
            createOrderDetails: createOrderDetails,
            findOrdersDetailsByOrderId: findOrdersDetailsByOrderId,
            findOrderDetailsById: findOrderDetailsById
        };
        return api;

        function createOrderDetails(orderId, order) {
            var newOrder = {
                SlNo: order.SlNo,
                description:order.description,
                diameter: order.diameter,
                clothdesc: order.clothdesc,
                color: order.color,
                actualWeight:order.actualWeight,
                pdcWeight:order.pdcWeight,
                actualRolls:order.actualRolls,
                pdcRolls:order.pdcRolls,
                uom:order.uom,
                Remarks:order.Remarks,
                _order: orderId
            };
            var url = "/api/order/" + orderId + "/orderdetails";
            return $http.post(url, newOrder);
        }

        function findOrdersDetailsByOrderId(orderId) {
            var url = "/api/order/" + orderId + "/orderdetails";
            return $http.get(url);

        }

        function findOrderDetailsById(orderId) {
            var url = "/api/orderdetails/" + orderId;
            return $http.get(url);
        }

    }
})();