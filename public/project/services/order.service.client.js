(function () {
angular
.module("TexApp")
.factory("OrderService", OrderService);

function OrderService($http) {
var api = {
createOrder: createOrder,
deleteOrder: deleteOrder,
updateOrder: updateOrder,
findOrderByCompanyId: findOrderByCompanyId,
findOrderById: findOrderById,
findAllOrdersForCompany: findAllOrdersForCompany
};
return api;

function createOrder(companyId, order) {
var newOrder = {
SlNo: order.SlNo,
description:order.description,
_company: companyId
};
var url = "/api/company/" + companyId + "/order";
return $http.post(url, newOrder);
}

function deleteOrder(orderId) {
var url = "/api/order/" + orderId;
return $http.delete(url);
}

function updateOrder(orderId, order) {
var url = "/api/order/" + orderId;
return $http.put(url, order);
}

function findOrderByCompanyId(companyId) {
var url = "/api/company/" + companyId + "/order";
return $http.get(url);

}

function findOrderById(orderId) {
var url = "/api/order/" + orderId;
return $http.get(url);
}

function findAllOrdersForCompany(companyId) {
var url="/api/company/" + companyId+ "/order";
return $http.get(url);
}

}
})();